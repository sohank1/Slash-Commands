import { SlashCommands } from "../src/index";
import { Client } from "discord.js";

const client = new Client();
client.login("");

client.on("ready", async () => {
  new SlashCommands(client, "./slash");
  console.log("Ready");
});
