import { MessageEmbed } from "discord.js";
import { SlashCommand } from "../../src/index";

export default new SlashCommand({
  name: "somecommand",
  description: "Some test guild Command",
  guilds: "831969578099277844",
  response: ({ client, member }) => {
    return [
      "Yes indeed",
      new MessageEmbed().setDescription(member?.user.username || "No Member"),
    ];
  },
});
