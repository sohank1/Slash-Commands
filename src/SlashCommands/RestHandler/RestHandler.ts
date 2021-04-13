import { Client } from "../../Client";
import { ApplicationCommand } from "./types/ApplicationCommand";

/**
 * Private class used in the SlashCommands class
 * Used to send slash command api requests 
 */
export class RestHandler {
    constructor(private client: Client) { }

    public async post(data: ApplicationCommand): Promise<ApplicationCommand> {
        return await this.client.api.applications(this.client.user.id)
            .commands.post({ data });
    }
}