const { GiveawayManager } = require("discord-giveaways")

module.exports = async bot => {

    bot.giveawaysManager = new GiveawaysManager(bot, {
        storage: "./giveaways.json",
        updateCountdownEvery: 5000,
        default: {
            botsCanWin: false,
            exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
            embedColor: "#FF0000",
            reaction: "🎉"
        }
    });
}