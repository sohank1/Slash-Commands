import { Channel, Guild } from "discord.js";
import { Client } from "../../Client";
import { ApplicationCommand } from "./types/ApplicationCommand";
import { GuildMember } from "./types/GuildMember";
import { Interaction } from "./types/Interaction";
import { InteractionResponseEnum } from "./types/InteractionResponseType";
import { InteractionType } from "./types/InteractionType";
/**
 * Private class used in the SlashCommands class
 * Used to send slash command api requests
 */
export class RestHandler {
  constructor(private client: Client) {}

  public async post(data: ApplicationCommand): Promise<ApplicationCommand> {
    return await this.client.api
      .applications(this.client.user.id)
      .commands.post({ data });
  }
  // Change type to something that actually makes sense, I just don't know what would be returned.
  public async callback(
    interaction: Interaction,
    data: ApplicationCommand,
    member: GuildMember,
    guild?: Guild | undefined,
    channel?: Channel | undefined,
  ): Promise<unknown | undefined> {
    // if (!data.response) return undefined;

    const command_callback_response = data.response({
      client: this.client,
      interaction,
    });
    if (!command_callback_response) return undefined;

    // console.log(interaction, member, guild, channel, command_callback_response);

    return await this.client.api
      .interactions(interaction.id, interaction.token)
      .callback.post({
        data: {
          type: 4,
          data: {
            content: command_callback_response,
          },
        },
      });
  }
}
