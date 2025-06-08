const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Create a ticket message")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const { guild } = interaction;

        const embed = new EmbedBuilder()
            .setDescription("Open a new ticket by clicking the button below:")
            .setColor('#FFFAFA');

        const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder()
                .setCustomId('OpenTicket')
                .setLabel('Open Ticket')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🎫')
        );

        await guild.channels.cache.get(config.openticket).send({
            embeds: [embed],
            components: [button]
        });

        interaction.reply({ content: 'Ticket message has been sent.', ephemeral: true });
    }
}