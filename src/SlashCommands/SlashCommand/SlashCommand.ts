import { User, GuildMember, Guild, Channel, MessageEmbed } from "discord.js";
import { Client } from "../../Client"
import { Interaction } from "../RestHandler/types/Interaction";
import { SlashCommandType } from "./SlashCommand.interface";
// TODO: Add support for guild specific slash commands
// As of now, all commands made are global.
export abstract class SlashCommand {
  constructor(public data: SlashCommandType) { }

  public abstract onCommand(data: {
    interaction: Interaction;
    user: User | null;
    member: GuildMember | null;
    guild: Guild | null;
    channel: Channel | null;
    client: Client;
  }): | string
    | MessageEmbed
    | Array<MessageEmbed>
    | Array<string>
    | Array<string | MessageEmbed>
    | Promise<
      | string
      | MessageEmbed
      | Array<MessageEmbed>
      | Array<string>
      | Array<string | MessageEmbed>
    >;
}
