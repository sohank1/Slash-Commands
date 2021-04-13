export { SlashCommands } from "./SlashCommands/SlashCommands";
import { Client } from "discord.js";
import { SlashCommands } from "./SlashCommands/SlashCommands";

const client = new Client()
client.login("")

client.on("ready", () => {
    const sc = new SlashCommands(client);
    sc.createCommand({
        name: "command",
        description: "some",
        options: [{
            name: "asdf",
            description: "sadf",
            type: 3,
            choices: [{ name: "asdf", value: "asdf" }, { name: "asew", value: "waf" }],
            // options: [{
            //     name: "subcommand",
            //     description: "asdf",
            //     type: 3
            // }]
        }]
    })
    console.log('looged it')
})
