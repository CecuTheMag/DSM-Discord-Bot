const { CommandInteraction } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return interaction.reply({ content: "outdated command" });
      }
      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      const { customId } = interaction;

      if (customId === "verify") {
        const role = interaction.guild.roles.cache.get(config.verifiedRoleId);
        return interaction.member.roles.add(role).then(() => {
          if (config.unverifiedRoleId) {
            interaction.member.roles.remove(config.unverifiedRoleId);
          }
          interaction.reply({
            content: `${role} has been assigned to you.`,
            ephemeral: true,
          });
        });
      }
    } else {
      return;
    }
  },
};