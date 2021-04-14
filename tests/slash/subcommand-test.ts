import { SlashCommand } from "../../src/index";
import { ApplicationCommandOptionEnum } from "../../src/SlashCommands/RestHandler/types/ApplicationCommandOptionType";

export default new SlashCommand({
  name: "testing",
  description: "A test subcommand slash-command",
  options: [
    {
      name: "member",
      description: "Get/Edit Permissions for a member",
      type: ApplicationCommandOptionEnum.SUB_COMMAND_GROUP,
      required: false,
      options: [
        {
          name: "get",
          description: "Get permissions for a member",
          type: ApplicationCommandOptionEnum.SUB_COMMAND,
          required: false,
          options: [
            {
              name: "member",
              description: "The member whose permissions to get",
              type: ApplicationCommandOptionEnum.USER,
              required: true,
            },
            {
              name: "channel",
              description:
                "The channel permissions to get. If omitted, the guild permissions will be fetched",
              type: ApplicationCommandOptionEnum.CHANNEL,
              required: false,
            },
          ],
        },
        {
          name: "set",
          description: "Set permissions for a member",
          type: ApplicationCommandOptionEnum.SUB_COMMAND,
          required: false,
          options: [
            {
              name: "member",
              description: "The member whose permissions to set",
              type: ApplicationCommandOptionEnum.USER,
              required: true,
            },
            {
              name: "channel",
              description:
                "The channel permissions to set. If omitted, the guild permissions will be set",
              type: ApplicationCommandOptionEnum.CHANNEL,
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: "role",
      description: "Get/Edit Permissions for a role",
      type: ApplicationCommandOptionEnum.SUB_COMMAND_GROUP,
      required: false,
      options: [
        {
          name: "get",
          description: "Get permissions for a role",
          type: ApplicationCommandOptionEnum.SUB_COMMAND,
          required: false,
          options: [
            {
              name: "role",
              description: "The role whichs' permissions to get",
              type: ApplicationCommandOptionEnum.USER,
              required: true,
            },
            {
              name: "channel",
              description:
                "The channel permissions to get. If omitted, the guild permissions will be got",
              type: ApplicationCommandOptionEnum.CHANNEL,
              required: false,
            },
          ],
        },
        {
          name: "set",
          description: "Set permissions for a role",
          type: ApplicationCommandOptionEnum.SUB_COMMAND,
          required: false,
          options: [
            {
              name: "role",
              description: "The role whichs' permissions to set",
              type: ApplicationCommandOptionEnum.USER,
              required: true,
            },
            {
              name: "channel",
              description:
                "The channel permissions to set. If omitted, the guild permissions will be set",
              type: ApplicationCommandOptionEnum.CHANNEL,
              required: false,
            },
          ],
        },
      ],
    },
  ],
  response: ({ user, member, guild, channel, client, interaction }) => {
    console.log(interaction, interaction.data, interaction.data.resolved);
    return "Tests";
  },
});
