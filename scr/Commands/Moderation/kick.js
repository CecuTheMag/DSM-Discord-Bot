const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const config = require("../../config.json");

module.exports = {
data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the discord server.") .setDefaultMemberPermissions (PermissionFlagsBits.KickMembers)
    .addUserOption (option =>
        option.setName("target")
        .setDescription("User to be kicked.")
        .setRequired(true)
    )
    .addStringOption (option =>
        option.setName("reason")
        .setDescription("Reason for the kick.")
    ),

    async execute(interaction){
        const { options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided.";

        const member = await interaction.guild.members.fetch(user.id);
        const errEmbed= new EmbedBuilder()
            .setTitle(config.botName)
            .setDescription (`You can't take action on ${user.username} since they have a higher role.`) 
            .setColor('#FFFAFA')

        if (member.roles.highest.position >= interaction.member.roles.highest.position) 
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
        .setTitle(config.botName)
        .setDescription (`Successfully kicked ${user} with reason: ${reason}`)
        .setColor('#FFFAFA');

        await interaction.reply({
            embeds: [embed],
        });
    }

}
