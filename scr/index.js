require("dotenv").config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
const config = require('../config.json');
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;


const client = new Client( {
    intents: [
      Guilds, GuildMembers , GuildMessages, MessageContent
    ],
    partials: [
        User, Message, GuildMember, ThreadMember
    ],
});

client.commands = new Collection();
client.config = config;

client.login(process.env.TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
});