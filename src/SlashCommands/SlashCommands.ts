import { Client as DjsClient } from "discord.js";
import { Client } from "../Client";
import { RestHandler } from "./RestHandler/RestHandler";
import { ApplicationCommand } from "./RestHandler/types/ApplicationCommand";

export class SlashCommands {
    private _rest = new RestHandler(<Client><unknown>this.client);

    constructor(private client: DjsClient) { }

    // later data's type will be a "SlashCommand | SlashCommandObject"
    public createCommand(data: ApplicationCommand) {
        this._rest.post(data).then(console.log);
    }
}