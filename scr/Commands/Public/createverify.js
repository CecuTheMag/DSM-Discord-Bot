const { ButtonBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createverify')
        .setDescription('Set verification channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Send verification embed')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
            .setTitle(`${config.botName} Verification`)
            .setDescription('Click the button to continue to the server.')
            .setColor("#FFFAFA");
        let sendChannel = await channel.send({
            embeds: [verifyEmbed],
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verify').setStyle(ButtonStyle.Success),
                ),
            ],
        });
        if (!sendChannel) {
            return interaction.reply({ content: 'There was an error', ephemeral: true });
        } else {
            return interaction.reply({ content: 'Verification embed sent!', ephemeral: true });
        }
    },
};