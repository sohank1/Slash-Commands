import { SlashCommand } from "../../src/index";

export default {
  data: {
    name: "boink",
    description: "Hey There",
    // This is how I would imagine it to work somehow, but I am unsure.
    response: ({ client, interaction }: { client: any; interaction: any }) => {
      return `Yes sir, thats a boink`;
    },
  },
};
