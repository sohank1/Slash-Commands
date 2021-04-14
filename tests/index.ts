import { SlashCommands } from "../src/index";
import { Client } from "discord.js";

const client = new Client();
client.login("Nzc2NTM4NDA4NzgwMDM4MTQ0.X62VwA.7tzfLW6-cDg-IZZtMk8UWZU6Efo");

client.on("ready", async () => {
  new SlashCommands(client, "./slash");
  console.log("Ready");
});
