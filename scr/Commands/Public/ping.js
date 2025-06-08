const { SlashCommandBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong"),
    execute(interaction) {
        interaction.reply({ content: `${config.botName} Pong OK`, ephemeral: true });
    },
};