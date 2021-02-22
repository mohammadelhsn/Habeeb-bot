const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json")
const BaseErrorEmbed = require("../../BaseErrorEmbed");
const BaseEmbed = require("../../BaseEmbed");


module.exports = {
    config: {
        name: "bug",
        description: "Sends a bug report to the owner of this bot",
        usage: "<command name> <details about the bug>",
        category: "bot utilities",
        accessableby: "All",
        aliases: ["breport"]
    },
        run: async (bot, message, args) => {
            
            let bug = args.slice(0).join(" ")


            const errorEmbed = BaseErrorEmbed(bot, message)
            .setDescription(`\`\`\`Error details: Must provide a bug!\`\`\``)
            .setFooter(`Bug command | ${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
            if(!bug) return message.channel.send(errorEmbed);


            message.author.send("Thank you for reporting the bug! I will try to fix it as soon as possible!")

            const embed = BaseEmbed(bot, message)
            .setTitle("New bug report")
            .setDescription(`${message.author.username} has reported a bug`)
            .addField("Bug", `\`${bug}\``, true)
            .setFooter(`Bug command | ${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
            bot.channels.cache.get("700083327972933723").send(embed);
        }
}