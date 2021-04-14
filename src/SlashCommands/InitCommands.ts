import { readdirSync } from "fs";
import { join } from "path";
import { Client } from "../Client";
import { RestHandler } from "./RestHandler/RestHandler";
import { Interaction } from "./RestHandler/types/Interaction";
import { SlashCommand } from "./SlashCommand";

export async function initCommands(
  client: Client,
  rest: RestHandler,
  relative_path: string,
) {
  const path = join(require.main.path, relative_path);
  const data = readdirSync(path);
  const commands = new Map<string, SlashCommand>();

  for (const file of data) {
    const { default: Command }: { default: SlashCommand } = await import(
      join(path, file)
    );
    if (!Command.data) continue;
    console.log(Command);

    await rest.post(Command.data);
    commands.set(Command.data.name.toLowerCase(), Command);
  }
  // @ts-ignore
  client.ws.on("INTERACTION_CREATE", async (interaction: Interaction) => {
    console.log("hey", "interaction was made", interaction.data);
    const { member, data, guild_id, channel_id } = interaction;

    await rest.callback(
      interaction,
      commands.get(data.name)?.data,
      member,
      client.guilds.cache.get(guild_id) ?? undefined,
      client.channels.cache.get(channel_id) ?? undefined,
    );
    // await this.callback();
  });
}
