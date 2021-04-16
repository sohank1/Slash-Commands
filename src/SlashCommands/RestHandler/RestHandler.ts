import { Channel, Guild, GuildMember, MessageEmbed } from "discord.js";
import { Client } from "../../Client";
import { ApplicationCommand } from "./types/ApplicationCommand";
// import { SlashCommandType } from "../SlashCommand/SlashCommand.interface";
import { Interaction } from "./types/Interaction";
// TODO: Add support for guild specific slash commands
// As of now, all commands made are global.

/**
 * Private class used in the SlashCommands class
 * Used to send slash command api requests
 */
export class RestHandler {
  constructor(private client: Client) {}

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
    console.log(data);
    let api = this.client.api.applications(this.client.user.id);
    if (guild_id) api = api.guilds(guild_id);
    try {
      let res = await api.commands.post({ data: data });
    } catch (err) {
      console.log(err);
      return err.httpStatus;
    }
  }

  public async edit(
    interaction: Interaction,
    data:
      | string
      | MessageEmbed
      | string[]
      | MessageEmbed[]
      | (string | MessageEmbed)[],
  ): Promise<unknown | undefined> {
    console.log("in edit fn");
    const _data: { content?: string; embeds?: Array<MessageEmbed> } = {};
    if (typeof data === "string") _data.content = data;
    else if (data instanceof MessageEmbed) _data.embeds = [data];
    else if (data instanceof Array) {
      const strings = data.filter((v) => typeof v === "string");
      const embeds = data.filter((v) => typeof v === "object");

      if (strings.length > 0) _data.content = strings.join("");
      // @ts-ignore -- Idk why this is needed, I thought the above filter would take care of it... /shrug
      if (embeds.length > 0) _data.embeds = embeds;
    }
    const res = await this.client.api
      .webhooks(this.client.user.id, interaction.token)
      .messages["@original"].patch({
        data: _data,
      });
    console.log(res);
    return res;
  }

  // Change return type to something that actually makes sense, I just don't know what would be returned.
  public async callback(
    interaction: Interaction,
    data:
      | string
      | MessageEmbed
      | string[]
      | MessageEmbed[]
      | (string | MessageEmbed)[],
  ): Promise<unknown | undefined> {
    // const command_callback_response = await data.response({
    //   client: this.client,
    //   guild,
    //   member,
    //   user: this.client.users.cache.get(member?.user.id),
    //   channel,
    //   interaction,
    // });
    // if (!command_callback_response) return undefined;

    // console.log(command_callback_response);

    const _data: { content?: string; embeds?: Array<MessageEmbed> } = {};
    if (typeof data === "string") _data.content = data;
    else if (data instanceof MessageEmbed) _data.embeds = [data];
    else if (data instanceof Array) {
      const strings = data.filter((v) => typeof v === "string");
      const embeds = data.filter((v) => typeof v === "object");

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
