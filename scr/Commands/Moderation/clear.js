const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears Chat")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Messages to clear')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Select a target to clear their messages')
                .setRequired(false)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser("target");

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const res = new EmbedBuilder()
            .setTitle(config.botName)
            .setColor("#FFFAFA");

        if (target) {
            let i = 0;
            const filtered = [];

            messages.filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Deleted ${messages.size} messages from ${target}`);
                interaction.reply({ embeds: [res] });
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Deleted ${messages.size} messages from the channel`);
                interaction.reply({ embeds: [res] });
            });
        }
    }
}

