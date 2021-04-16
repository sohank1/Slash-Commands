import { Client as DjsClient } from "discord.js";
import { Client } from "../Client";
import { initCommands } from "./SlashCommand/InitCommands";
import { RestHandler } from "./RestHandler/RestHandler";
import { ApplicationCommand } from "./RestHandler/types/ApplicationCommand";
import { Interaction } from "./RestHandler/types/Interaction";
import Slashy from "./SlashCommand/TempSlashCommand";
// TODO: Add support for guild specific slash commands
// As of now, all commands made are global.
export class SlashCommands {
  private _rest = new RestHandler(<Client>(<unknown>this.client));
  public global_commands = new Map<string, Slashy>();
  public guild_commands = new Map<string, Slashy>();

  constructor(private client: DjsClient, private path: string) {
    this._init();
    // @ts-ignore
    client.ws.on("INTERACTION_CREATE", async (interaction: Interaction) => {
      const { member, data, guild_id, channel_id } = interaction;

      const guild = client.guilds.cache.get(guild_id);
      const channel = client.channels.cache.get(channel_id);

      const member_object = guild?.members.cache.get(member.user.id);

      const execute_client = <Client>(<unknown>client);

      // console.log(interaction, "iteraction!");

      const slash_command =
        this.guild_commands.get(data.name.toLowerCase()) ??
        this.global_commands.get(data.name.toLowerCase());

      if (slash_command !== undefined) {
        slash_command.interaction = interaction;

        return slash_command.execute({
          client: execute_client,
          channel,
          guild,
          interaction,
          member: member_object,
          user: client.users.cache.get(member.user?.id),
        });
      }

      // if (
      //   !this.guild_commands.get(data.name.toLowerCase()) &&
      //   this.global_commands.get(data.name.toLowerCase())
      // )
      //   await this.global_commands.get(data.name.toLowerCase()).execute({
      //     client: execute_client,
      //     channel,
      //     guild,
      //     interaction,
      //     member: member_object,
      //     user: client.users.cache.get(member.user?.id),
      //   });
      // else if (
      //   this.guild_commands.get(data.name.toLowerCase()) &&
      //   !this.global_commands.get(data.name.toLowerCase())
      // )
      //   await this.guild_commands.get(data.name.toLowerCase()).execute({
      //     client: execute_client,
      //     channel,
      //     guild,
      //     interaction,
      //     member: member_object,
      //     user: client.users.cache.get(member.user?.id),
      //   });
      // else return;
      // await this._rest.callback(
      //   interaction,
      //   this.global_commands.get(data.name)?.data ??
      //     this.guild_commands.get(data.name)?.data,
      //   member_object,
      //   guild ?? null,
      //   channel ?? null,
      // );
    });
  }

  private async _init(): Promise<void> {
    // console.log("ay?");
    await initCommands(
      <Client>(<unknown>this.client),
      this._rest,
      this.path,
      this,
    );
  }

  // Note: We may want to keep this as an option, but for now we can use the "command handler" format for them.

  // later data's type will be a "SlashCommand | SlashCommandObject"
  // public createCommand(data: ApplicationCommand) {
  //   this._rest.post(data).then(console.log);
  //   return this;
  // }
}
