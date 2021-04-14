import { Channel, Guild, GuildMember, MessageEmbed } from "discord.js";
import { Client } from "../../Client";
import { ApplicationCommand } from "./types/ApplicationCommand";
import { SlashCommandType } from "./types/SlashCommand.interface";
import { Interaction } from "./types/Interaction";
// TODO: Add support for guild specific slash commands
// As of now, all commands made are global.

/**
 * Private class used in the SlashCommands class
 * Used to send slash command api requests
 */
export class RestHandler {
  constructor(private client: Client) {}

  public async get_commands(): Promise<Array<ApplicationCommand>> {
    return await this.client.api
      .applications(this.client.user.id)
      .commands.get();
  }

  public async delete(command_id: string): Promise<void> {
    return await this.client.api
      .applications(this.client.user.id)
      .commands(command_id)
      .delete();
  }

  public async post(data: ApplicationCommand): Promise<ApplicationCommand> {
    return await this.client.api
      .applications(this.client.user.id)
      .commands.post({ data });
  }
  // Change return type to something that actually makes sense, I just don't know what would be returned.
  public async callback(
    interaction: Interaction,
    data: SlashCommandType,
    member: GuildMember,
    guild?: Guild | null,
    channel?: Channel | null,
  ): Promise<unknown | undefined> {
    const command_callback_response = data.response({
      client: this.client,
      guild,
      member,
      user: this.client.users.cache.get(member?.user.id),
      channel,
      interaction,
    });
    if (!command_callback_response) return undefined;

    const _data: { content?: string; embeds?: Array<MessageEmbed> } = {};
    if (typeof command_callback_response === "string")
      _data.content = command_callback_response;
    else if (command_callback_response instanceof MessageEmbed)
      _data.embeds = [command_callback_response];
    else if (command_callback_response instanceof Array) {
      const strings = command_callback_response.filter(
        (v) => typeof v === "string",
      );
      const embeds = command_callback_response.filter(
        (v) => v instanceof MessageEmbed,
      );

      if (strings.length > 0) _data.content = strings.join("");
      // @ts-ignore -- Idk why this is needed, I thought the above filter would take care of it... /shrug
      if (embeds.length > 0) _data.embeds = embeds;
    }

    return await this.client.api
      .interactions(interaction.id, interaction.token)
      .callback.post({
        data: {
          type: 4,
          data: _data,
        },
      });
  }
}
