const {
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const config = require("../../../config.json");
const ticketSchema = require("../Models/Ticket.js");
const requiredPermissions = [
    PermissionFlagsBits.ManageChannels
];

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const { guild, member, customId, channel } = interaction;
        if (!interaction.isButton()) return;

        if (!["close", "lock", "unlock"].includes(customId)) return;

        if (!guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels))
            return interaction.reply({ content: "No permissions", ephemeral: true });

        const embed = new EmbedBuilder().setColor("Aqua");

        ticketSchema.findOne({ ChannelID: channel.id }, async (err, data) => {
            if (err) throw err;
            if (!data) return;

            const fetchedMember = await guild.members.cache.get(data.MemberID);

            switch (customId) {
                case "close":
                    if (data.Closed === true)
                        return interaction.reply({
                            content: "Ticket is getting deleted...",
                            ephemeral: true,
                        });

                    const transcript = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        filename: `${member.user.username}-ticket${data.Type}-${data.TicketID}.html`,
                    });

                    await ticketSchema.updateOne({ ChannelID: channel.id }, { Closed: true });

                    const transcriptEmbed = new EmbedBuilder()
                        .setTitle(`Transcript Type: ${data.Type}\nId: ${data.TicketID}`)
                        .setFooter({
                            text: member.user.tag,
                            iconURL: member.displayAvatarURL({ dynamic: true }),
                        })
                        .setTimestamp();

                    const transcriptProcess = new EmbedBuilder()
                        .setTitle("Saving transcript...")
                        .setDescription(
                            "Ticket will be closed in 10 seconds. We are saving the transcript for security reasons."
                        )
                        .setColor("Red")
                        .setFooter({
                            text: member.user.tag,
                            iconURL: member.displayAvatarURL({ dynamic: true }),
                        })
                        .setTimestamp();

                    const res = await guild.channels.cache.get(config.transcriptsChannelId).send({
                        embeds: [transcriptEmbed],
                        files: [transcript],
                    });

                    channel.send({ embeds: [transcriptProcess] });

                    setTimeout(function () {
                        channel.delete();
                    }, 10000);
                    break;

                case "lock":
                    if (!member.permissions.has(requiredPermissions))
                        return interaction.reply({ content: "You don't have permission for this!", ephemeral: true });

                    if (data.Locked === true)
                        return interaction.reply({
                            content: "Ticket is already locked",
                            ephemeral: true,
                        });

                    await ticketSchema.updateOne(
                        { ChannelID: channel.id },
                        { Locked: true }
                    );
                    embed.setDescription("Ticket was locked!");

                    channel.permissionOverwrites.edit(fetchedMember, {
                        SendMessages: false,
                    });

                    return interaction.reply({ embeds: [embed] });

                case "unlock":
                    if (!member.permissions.has(requiredPermissions))
                        return interaction.reply({ content: "You don't have permission for this!", ephemeral: true });

                    if (data.Locked === false)
                        return interaction.reply({
                            content: "Ticket is already unlocked",
                            ephemeral: true,
                        });

                    await ticketSchema.updateOne(
                        { ChannelID: channel.id },
                        { Locked: false }
                    );
                    embed.setDescription("Ticket was unlocked!");

                    channel.permissionOverwrites.edit(fetchedMember, {
                        SendMessages: true,
                    });

                    return interaction.reply({ embeds: [embed] });
            }
        });
    },
};
