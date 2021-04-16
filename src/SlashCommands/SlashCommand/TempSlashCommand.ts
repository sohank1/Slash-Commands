import { MessageEmbed } from "discord.js";
import { Client } from "../../Client";
import { RestHandler } from "../RestHandler/RestHandler";
import { ApplicationCommand } from "../RestHandler/types/ApplicationCommand";
import { Interaction } from "../RestHandler/types/Interaction";
import { SlashCommandType, SlashyExecute } from "./SlashCommand.interface";

export default class Slashy {
  private _rest: RestHandler;
  private _interaction: Interaction;
  public send: (
    data:
      | string
      | MessageEmbed
      | string[]
      | MessageEmbed[]
      | (string | MessageEmbed)[],
  ) => Promise<void> = async (
    data:
      | string
      | MessageEmbed
      | string[]
      | MessageEmbed[]
      | (string | MessageEmbed)[],
  ): Promise<any> => this._rest.callback(this._interaction, data);
  public edit: (
    data:
      | string
      | MessageEmbed
      | string[]
      | MessageEmbed[]
      | (string | MessageEmbed)[],
  ) => Promise<void> = async (
    data:
      | string
      | MessageEmbed
      | string[]
      | MessageEmbed[]
      | (string | MessageEmbed)[],
  ): Promise<any> => this._rest.edit(this._interaction, data);

  constructor(
    public data: SlashCommandType,
    public execute: ({}: SlashyExecute) => Promise<unknown>,
  ) {}

  public set rest(rest: RestHandler) {
    this._rest = rest;
  }

  public set interaction(interaction: Interaction) {
    this._interaction = interaction;
  }
}
