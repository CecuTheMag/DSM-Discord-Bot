const { EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const { user, guild } = member;
        const welcomeChannel = guild.channels.cache.get(config.welcomeChannelId);
        const welcomeMessage = config.welcome.message;
        const q = `<@${member.id}>`;
        const memberRole = config.memberRoleId;

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#FFFAFA')
            .setTitle(config.welcome.title)
            .setAuthor({ name: config.welcome.author })
            .setFooter({ text: config.welcome.footer })
            .setTimestamp()
            .addFields(
                { name: welcomeMessage, value: "\n!We are working on your dreams!" },
                ...config.welcome.fields
            )
            .setThumbnail(user.avatarURL())
            .setImage(config.welcome.image);

        if (welcomeChannel) {
            welcomeChannel.send({ content: q, embeds: [welcomeEmbed] });
        }
        if (memberRole) {
            member.roles.add(memberRole);
        }

        // If you have a function updateVoiceChannelName, make sure it's defined somewhere
        // updateVoiceChannelName(guild);
    }
}
