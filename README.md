# Slash-Commands
A Discord Slash Command package for Discord.js

## Installation 
`npm i slashcommands`

## Usage
```js
const { Client } = require("discord.js");
const { SlashCommands } = require("slashcommands");

const client = new Client();
client.login("YOUR TOKEN");

client.on("ready", () => {
  const slashCommands = new SlashCommands()
    .init(client);
});
```
