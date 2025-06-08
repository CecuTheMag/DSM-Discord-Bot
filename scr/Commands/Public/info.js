const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("About Us")
        .setDefaultMemberPermissions(),
    execute(interaction) {
        const info = config.info;
        const HelpEmbed = new EmbedBuilder()
            .setColor('#FFFAFA')
            .setTitle('Info')
            .setAuthor({ name: info.author })
            .setDescription(info.description)
            .setThumbnail(info.thumbnail)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                ...info.fields,
                { name: '\u200B', value: '\u200B' }
            )
            .setImage(info.image)
            .setTimestamp()
            .setFooter({ text: info.footer });

        interaction.reply({ embeds: [HelpEmbed], ephemeral: false });
    },
}