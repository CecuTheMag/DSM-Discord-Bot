const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sysinfo')
        .setDescription('Displays system information about the server where the bot is hosted.'),
    async execute(interaction) {
        const uptime = os.uptime();
        const cpus = os.cpus(); 
        const memory = os.totalmem() / (1024 ** 3); 
        const freeMemory = os.freemem() / (1024 ** 3); 
        const platform = os.platform();
        const arch = os.arch();
        const hostname = os.hostname();

        const embed = new EmbedBuilder()
            .setColor('#FFFAFA')
            .setTitle('System Information')
            .addFields(
                { name: 'Uptime', value: `${Math.floor(uptime / 3600)} hours`, inline: true },
                { name: 'CPU Model', value: cpus[0].model, inline: true },
                { name: 'CPU Cores', value: cpus.length.toString(), inline: true },
                { name: 'Memory', value: `${memory.toFixed(2)} GB`, inline: true },
                { name: 'Free Memory', value: `${freeMemory.toFixed(2)} GB`, inline: true },
                { name: 'Platform', value: platform, inline: true },
                { name: 'Architecture', value: arch, inline: true },
                { name: 'Hostname', value: hostname, inline: true }
            )
            .setFooter({ text: 'System Info' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};