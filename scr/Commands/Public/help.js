const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows Instructions")
        .setDefaultMemberPermissions(),
    execute(interaction) {
        const HelpEmbed = new EmbedBuilder()
            .setColor('#FFFAFA')
            .setTitle(`${config.botName} Help`)
            .setAuthor({ name: config.botName })
            .setDescription('Here is a list of all the commands the bot will recognize! If you have any problems, please contact the server admin.')
            .addFields(
                { name: 'Prefix', value: 'Our prefix is set to "/"!' },
                { name: '\u200B', value: '\u200B' },
                { name: '`help`', value: 'Shows all the commands you are able to use', inline: true },
                { name: '`ping`', value: 'Tests if the bot is responding normally', inline: true },
                { name: '`clear`', value: 'Clears previous messages', inline: true },
                { name: '\u200B', value: '\u200B' },
            )
            .setTimestamp()
            .setFooter({ text: `Powered by ${config.botName}` });

        interaction.reply({ embeds: [HelpEmbed], ephemeral: true });
    },
};