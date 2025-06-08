const config = require("../../../config.json");
const spamTracker = new Map();

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    const blockedUserIds = config.blockedUserIds || [];
    const linkRegex = /(https?:\/\/\S+|discord\.gg\/\S+)/gi;

    if (blockedUserIds.includes(message.author.id) || linkRegex.test(message.content)) {
      if (blockedUserIds.includes(message.author.id)) {
        return;
      }

      if (spamTracker.has(message.author.id)) {
        const userData = spamTracker.get(message.author.id);
        const currentTime = Date.now();

        if (userData.count >= 3 && currentTime - userData.lastTimestamp < 10000) {
          const member = await message.guild.members.fetch(message.author.id);
          message.delete();
          member.ban({ reason: "Spamming links" })
            .then(() => {
              message.channel.send({
                content: `${message.author}, has been banned for spamming links!`
              });
            })
            .catch((error) => {
              console.error(`Error banning user: ${error}`);
              message.channel.send({
                content: `An error occurred while trying to ban ${message.author}.`
              });
            });

          spamTracker.delete(message.author.id);
          return;
        }

        userData.count += 1;
        userData.lastTimestamp = currentTime;
      } else {
        spamTracker.set(message.author.id, {
          count: 1,
          lastTimestamp: Date.now()
        });
      }

      message.delete();
      message.channel.send({
        content: `${message.author}, don't attempt to send links! :(`
      });
    }
  },
};