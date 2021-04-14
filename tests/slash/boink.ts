import { SlashCommand } from "../../src/index";

export default new SlashCommand({
  name: "boink",
  description: "Hey There",
  // This is how I would imagine it to work somehow, but I am unsure.
  response: ({ client, interaction }) => {
    return `Yes sir, thats a boink`;
  },
});
