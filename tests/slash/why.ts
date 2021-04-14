import { SlashCommand } from "../../src/index";

export default new SlashCommand({
  name: "why",
  description: "Hey There",
  // This is how I would imagine it to work somehow, but I am unsure.
  response: ({ client, interaction }) => {
    return `Why am I still here, just to suffer.`;
  },
});
