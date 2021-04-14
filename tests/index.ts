import { SlashCommands } from "../src/index";
import { Client } from "discord.js";
import { token } from "./config.json";

const client = new Client();
client.login(token);

client.on("ready", async () => {
  new SlashCommands(client, "./slash");
  console.log("Ready");
});
