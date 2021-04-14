import { SlashCommands } from "../src/index";
import { Client } from "discord.js";

const client = new Client();
client.login("go away saftey jim");

client.on("ready", async () => {
  new SlashCommands(client, "./slash");
  console.log("Ready");
});
