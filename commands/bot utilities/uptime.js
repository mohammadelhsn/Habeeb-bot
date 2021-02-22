const BaseErrorEmbed = require("../../BaseErrorEmbed");
const BaseEmbed = require("../../BaseEmbed");

module.exports = {
config: {
    name: "uptime", // Command name
    description: "Sends the uptime of the bot", // Description of the command
    usage: "", // usage of the command
    category: "bot utilities",
    accessableby: "Members", // Accessable by Members
    aliases: ["ut"] // Aliases of the command 
},
    run: async (bot, message, args) => {
        // Defining Days, Hours, MInutes and seconds!
        function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds,`

        }

        const embed = BaseEmbed(bot, message)
        .setTitle(`${bot.user.username} uptime`)
        .setDescription(`I have been online for ${duration(bot.uptime)}`)
        .setFooter(`Uptime command | ${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
        return message.channel.send(embed);
        }
    }
