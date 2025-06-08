const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const ticketSchema = require("../Models/Ticket");
const { ticketParent, everyone } = require("../../../config.json");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        const { guild, member, customId } = interaction;
        const { ViewChannel, SendMessages, ManageChannels, ReadMessageHistory } = PermissionFlagsBits;
        const ticketId = Math.floor(Math.random() * 9000) + 10000;

        if (!interaction.isButton()) return;

        if (!["Help", "Bug", "Shopping", "Other"].includes(customId)) return;

        if (!guild.members.me.permissions.has(ManageChannels))
            return interaction.reply({ content: 'No permissions', ephemeral: true });

        try {
            await guild.channels.create({
                name: `${member.user.username}-${ticketId}`,
                type: ChannelType.GuildText,
                parent: ticketParent,
                permissionOverwrites: [
                    {
                        id: everyone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: member.id,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                ],
            }).then(async (channel) => {
                await ticketSchema.create({
                    GuildID: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: customId,
                });

                const embed = new EmbedBuilder()
                    .setTitle(`${guild.name} - Ticket: ${customId}`)
                    .setDescription("The Team will contact you shortly. In this time please describe your order.")
                    .setFooter({ text: `${ticketId}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                // Only one button: Close ticket
                const button = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId('close')
                        .setLabel('Close ticket')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('❌')
                );

                channel.send({
                    embeds: [embed],
                    components: [button]
                });

                interaction.reply({ content: "Created a ticket", ephemeral: true });
            });
        } catch (err) {
            return console.log(err);
        }
    }
}