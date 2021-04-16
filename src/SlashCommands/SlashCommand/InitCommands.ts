import { Guild, TextChannel } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Client } from "../../Client";
import { RestHandler } from "../RestHandler/RestHandler";
import { ApplicationCommand } from "../RestHandler/types/ApplicationCommand";
import { Interaction } from "../RestHandler/types/Interaction";
import { SlashCommand } from "./SlashCommand";
import { TypeConversion } from "./TypeConversion";
// TODO: Add support for guild specific slash commands
// As of now, all commands made are global.
export async function initCommands(
  client: Client,
  rest: RestHandler,
  relative_path: string,
) {
  // ~~TODO: Do something with the fetched commands and check them against the ones being loaded
  // Ideally removing commands that aren't in "code" anymore and updating/creating the rest
  // Use the RestHandler#delete() method~~
  // Finished
  const current_global_commands = await rest.get_commands();
  if (
    typeof current_global_commands === "number" &&
    current_global_commands === 403
  )
    return console.log("Daily limit on command creation hit.");

  const current_guild_commands = await Promise.all(
    // Note: For some reason, when added to a new server, this seemingly doesn't work, even if the
    // bot has admin perms, and thus slash command perms, it still throws a missing perms error.
    client.guilds.cache.map(async (g) => {
      try {
        return await rest.get_commands(g.id);
      } catch (err) {
        // console.log("err", err);
      }
    }),
  );

  const path = join(require.main.path, relative_path);
  const data = readdirSync(path);
  const global_commands = new Map<string, SlashCommand>();
  const guild_commands = new Map<string, SlashCommand>();

  for (const file of data) {
    const { default: Command }: { default: SlashCommand } = await import(
      join(path, file)
    );
    if (!(Command instanceof SlashCommand)) {
      console.log(
        `SlashCommand at path ${join(
          path,
          file,
        )} is invalid, you must use the SlashCommand class.`,
      );
      continue;
    }
    if (!Command.data) {
      console.log("No data provided");
      continue;
    }
    if (Command.data.options && Command.data.options.length > 0)
      Command.data.options = TypeConversion(Command.data.options);

    console.log(Command.data.options);

    if (Command.data.guilds && typeof Command.data.guilds === "string")
      Command.data.guilds = [Command.data.guilds];

    if (Command.data.guilds !== undefined && Command.data.guilds.length > 0) {
      for (const guild_id of Command.data.guilds) {
        if (typeof guild_id === "string") {
          const guild_object = client.guilds.cache.get(guild_id);
          if (guild_object === undefined) {
            console.log(
              `Guild ID: ${guild_id} is either invalid or the application is not in the given guild.`,
            );
            continue;
          }

          const res = await rest.post(Command.data, guild_id);
          if (res !== 403) {
            console.log(
              `Created Command: ${Command.data.name} in guild ${guild_object.name}`,
            );
            guild_commands.set(Command.data.name, Command);
          } else
            console.log(
              `Unable to post command ${Command.data.name} due to daily creation limits.`,
            );
        } else if (guild_id instanceof Guild) {
          const res = await rest.post(Command.data, guild_id.id);
          if (res !== 403) {
            console.log(
              `Created Command: ${Command.data.name} in guild ${guild_id.name}`,
            );
            guild_commands.set(Command.data.name, Command);
          } else
            console.log(
              `Unable to post command ${Command.data.name} due to daily creation limits.`,
            );
        } else continue;
      }
    } else {
      const res = await rest.post(Command.data);
      if (res !== 403) {
        console.log(
          "Loaded Global Command: " + Command.data.name.toLowerCase(),
        ); // This is unecessary, can either be changed to look nicer, or removed.s
        global_commands.set(Command.data.name.toLowerCase(), Command);
      } else
        console.log(
          `Unable to post command ${Command.data.name} due to daily creation limits.`,
        );
    }
    // commands.set(Command.data.name.toLowerCase(), Command);
  }

  // After commands are initialzied, loop through the commands map to verify that all current_commands
  // are in the commands map
  for (const apiCommand of current_global_commands as ApplicationCommand[]) {
    if (!global_commands.get(apiCommand.name.toLowerCase())) {
      try {
        await rest.delete(apiCommand.id);
        console.log("Deleted Command: " + apiCommand.name + " from the api."); // This is unecessary, can either be changed to look nicer, or removed.
      } catch (err) { }
    }
  }

  for (const arr_of_commands of current_guild_commands) {
    if (
      arr_of_commands &&
      (arr_of_commands as ApplicationCommand[]).length > 0
    ) {
      for (const guild_command of arr_of_commands as ApplicationCommand[]) {
        // As of right now I can't think of any other way to delete the command correctly other
        // than looping through all guilds and deleting it from all of them, even if it doesn't exist
        // in that guild. I don't believe the ApplicationCommand has any information on the
        // guilds that it exists in, and if the command isn't set in the guild_commands map
        // then we have no way of knowing which guilds to remove it from... If you have any other way of
        // doing this, feel free.
        if (!guild_commands.get(guild_command.name.toLowerCase())) {
          for (const [guildId, __] of client.guilds.cache) {
            try {
              await rest.delete(guild_command.id, guildId);
              console.log(
                `Deleted Command: ${guild_command.name} from ${__.name}`,
              );
            } catch (err) { }
          }
        }
      }
    }
  }

  // @ts-ignore - I dislike ts-ignore
  client.ws.on("INTERACTION_CREATE", async (interaction: Interaction) => {
    const { member, data, guild_id, channel_id } = interaction;

    const guild = client.guilds.cache.get(guild_id);
    const channel = client.channels.cache.get(channel_id);

    const member_object = guild?.members.cache.get(member.user.id);

    await rest.callback(
      interaction,
      global_commands.get(data.name) ??
      guild_commands.get(data.name),
      member_object,
      guild ?? null,
      channel ?? null,
    );
  });
}
