# Slash-Commands
A Discord Slash Command package for Discord.js

## Installation 
`npm i slashcommands`

## Usage
```js
// index.js
const { Client } = require("discord.js");
const { SlashCommands } = require("slashcommands");

const client = new Client();
client.login("YOUR TOKEN");

client.on("ready", () => {
  const slashCommands = new SlashCommands({
    commandsDir: "commands",
    client
  });
});
```

And in the command file 
```ts
// commands/Ping.ts
export class PingCommand extends SlashCommand {
  constructor() {
      super({
          name: "ping",
          description: "Get's your ping to the bot"
      })
  }
  public async onCommand(data: Interaction) {
    this.send(...)
  }
}
```

