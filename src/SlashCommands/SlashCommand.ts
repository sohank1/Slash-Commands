import { SlashCommandType } from "./RestHandler/types/SlashCommand.interface";
// TODO: Add support for guild specific slash commands
// As of now, all commands made are global.
export class SlashCommand {
  constructor(public data: SlashCommandType) {}
}
