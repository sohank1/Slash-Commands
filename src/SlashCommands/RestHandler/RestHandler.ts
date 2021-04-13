import { Client } from "../../Client";

/**
 * Private class used in the SlashCommands class
 * Used to send slash command api requests 
 */
export class RestHandler {
    constructor(private client: Client) { }

    public post(): void {
        this.client.api.applications(this.client.user.id).commands.post({
            data: {
                name: "ping",
                description: "Gets your ping to TTS Bot",
            }
        });
    }
}