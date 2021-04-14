import { MessageEmbed } from "discord.js";
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
  response: ({ client, user }) => {
    return [
      new MessageEmbed({
        description: `This is a test embed!`,
        author: {
          name: user.username,
          iconURL: user.displayAvatarURL({ format: "png" }),
        },
        color: "RED",
        timestamp: Date.now(),
      }),
      new MessageEmbed({
        description: "This is the second embed",
        author: {
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        },
        color: "YELLOW",
        timestamp: Date.now() + 889342,
      }),
    ];
  },
});
