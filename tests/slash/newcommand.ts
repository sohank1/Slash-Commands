import { SlashCommand } from "../../src/index";
import { ApplicationCommandOptionEnum } from "../../src/SlashCommands/RestHandler/types/ApplicationCommandOptionType";
export default new SlashCommand({
  name: "thisisnew",
  description: "finally?",
  options: [
    {
      name: "option_one",
      type: ApplicationCommandOptionEnum.USER,
      description: "A user because why not",
      required: true,
    },
  ],
  // This is how I would imagine it to work somehow, but I am unsure.
  response: ({ client, interaction }) => {
    const user =
      interaction.data.resolved.users[
        Object.keys(interaction.data.resolved.users)[0]
      ];

    return `Yes, yes, ${user.username}#${user.discriminator} is alive`;
  },
});
