import { SlashCommand } from "../../src/index";

export default new SlashCommand({
  name: "ping",
  description: "This is strange.",
  // This is how I would imagine it to work somehow, but I am unsure.
  response: ({ client, interaction }) => {
    return `My ping is ${client.ws.ping}ms!`;
  },
});
