import { Client as DjsClient } from "discord.js";
import { Client } from "../Client";
import { initCommands } from "./InitCommands";
import { RestHandler } from "./RestHandler/RestHandler";
import { ApplicationCommand } from "./RestHandler/types/ApplicationCommand";
// TODO: Add support for guild specific slash commands
// As of now, all commands made are global.
export class SlashCommands {
  private _rest = new RestHandler(<Client>(<unknown>this.client));

  constructor(private client: DjsClient, private path: string) {
    this._init();
  }

  private async _init(): Promise<void> {
    await initCommands(<Client>(<unknown>this.client), this._rest, this.path);
  }

  // Note: We may want to keep this as an option, but for now we can use the "command handler" format for them.

  // later data's type will be a "SlashCommand | SlashCommandObject"
  // public createCommand(data: ApplicationCommand) {
  //   this._rest.post(data).then(console.log);
  //   return this;
  // }
}
