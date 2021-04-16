import { User, GuildMember, Guild, Channel, MessageEmbed } from "discord.js";
import { Client } from "../../Client"
import { RestHandler } from "../RestHandler/RestHandler";
import { Interaction } from "../RestHandler/types/Interaction";
import { SlashCommandType } from "./SlashCommand.interface";
// TODO: Add support for guild specific slash commands
// As of now, all commands made are global.
export abstract class SlashCommand {
  public _rest: RestHandler;

  constructor(public data: SlashCommandType) { }

  /**
   * Sends a message to the interaction sent by a user.
   * @param data - The message to send
   * @param interaction - The interaction received from the onCommand callback method
   */
  public send(data: string | MessageEmbed | MessageEmbed[] | string[] | (string | MessageEmbed)[], interaction: Interaction): void {
    this._rest.send(data, interaction);
  }

  /**
   * Callback method called when a user interacts with the slash command
   * @param data - Data about the user's interaction 
   */
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
