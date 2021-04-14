import { ApplicationCommand } from "./RestHandler/types/ApplicationCommand";

export class SlashCommand {
  constructor(public data: ApplicationCommand) {}
}
