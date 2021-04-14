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

    await rest.post(Command.data);
    commands.set(Command.data.name.toLowerCase(), Command);
  }
  // @ts-ignore
  client.ws.on("INTERACTION_CREATE", async (interaction: Interaction) => {
    const { member, data, guild_id, channel_id } = interaction;

    const guild = client.guilds.cache.get(guild_id);
    const channel = client.channels.cache.get(channel_id);

    const member_object = guild?.members.cache.get(member.user.id);

    await rest.callback(
      interaction,
      commands.get(data.name)?.data,
      member_object,
      guild ?? null,
      channel ?? null,
    );
  });
}
