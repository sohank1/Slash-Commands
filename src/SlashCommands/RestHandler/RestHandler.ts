import { Channel, Guild, GuildMember, MessageEmbed } from "discord.js";
import { Client } from "../../Client";
import { ApplicationCommand } from "./types/ApplicationCommand";
import { SlashCommandType } from "../SlashCommand/SlashCommand.interface";
import { Interaction } from "./types/Interaction";
import { SlashCommand } from "../SlashCommand/SlashCommand";
// TODO: Add support for guild specific slash commands
// As of now, all commands made are global.

/**
 * Private class used in the SlashCommands class
 * Used to send slash command api requests
 */
export class RestHandler {
  constructor(private client: Client) { }

  public async get_commands(
    guild_id?: string,
  ): Promise<Array<ApplicationCommand> | number> {
    let api = this.client.api.applications(this.client.user.id);
    if (guild_id) api = api.guilds(guild_id);

    try {
      return await api.commands.get();
    } catch (err) {
      return err.httpStatus;
    }
  }

  public async delete(
    command_id: string,
    guild_id?: string,
  ): Promise<void | number> {
    let api = this.client.api.applications(this.client.user.id);
    if (guild_id) api = api.guilds(guild_id);
    try {
      return await api.commands(command_id).delete();
    } catch (err) {
      return err.httpStatus;
    }
  }

  public async post(
    data: ApplicationCommand,
    guild_id?: string,
  ): Promise<ApplicationCommand | number> {
    let api = this.client.api.applications(this.client.user.id);
    if (guild_id) api = api.guilds(guild_id);
    try {
      return await api.commands.post({ data });
    } catch (err) {
      return err.httpStatus;
    }
  }

  // Change return type to something that actually makes sense, I just don't know what would be returned.
  public async callback(
    interaction: Interaction,
    command: SlashCommand,
    member: GuildMember,
    guild?: Guild | null,
    channel?: Channel | null,
  ): Promise<unknown | undefined> {
    const command_callback_response = await command.onCommand({
      client: this.client,
      guild,
      member,
      user: this.client.users.cache.get(member?.user.id),
      channel,
      interaction,
    });
    if (!command_callback_response) return undefined;

    console.log(command_callback_response);

    const _data: { content?: string; embeds?: Array<MessageEmbed> } = {};
    if (typeof command_callback_response === "string")
      _data.content = command_callback_response;
    else if (command_callback_response instanceof MessageEmbed)
      _data.embeds = [command_callback_response];
    else if (command_callback_response instanceof Array) {
      const strings = command_callback_response.filter(
        (v) => typeof v === "string",
      );
      const embeds = command_callback_response.filter((v) => {
        console.log(v, typeof v === "object");
        // return v instanceof MessageEmbed;
        return typeof v === "object";
      });

      console.log(embeds);

      if (strings.length > 0) _data.content = strings.join("");
      //  @ts-ignore -- Idk why this is needed, I thought the above filter would take care of it... /shrug
      if (embeds.length > 0) _data.embeds = embeds;

      console.log(_data);
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

  public async send(command_callback_response:
    string
    | MessageEmbed
    | MessageEmbed[]
    | string[]
    | (string | MessageEmbed)[],
    interaction: Interaction): Promise<unknown | undefined> {

    const _data: { content?: string; embeds?: Array<MessageEmbed> } = {};
    if (typeof command_callback_response === "string")
      _data.content = command_callback_response;
    else if (command_callback_response instanceof MessageEmbed)
      _data.embeds = [command_callback_response];
    else if (command_callback_response instanceof Array) {
      const strings = command_callback_response.filter(
        (v) => typeof v === "string",
      );
      const embeds = command_callback_response.filter((v) => {
        console.log(v, typeof v === "object");
        // return v instanceof MessageEmbed;
        return typeof v === "object";
      });

      console.log(embeds);

      if (strings.length > 0) _data.content = strings.join("");
      //  @ts-ignore -- Idk why this is needed, I thought the above filter would take care of it... /shrug
      if (embeds.length > 0) _data.embeds = embeds;

      console.log(_data);
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
