const BaseErrorEmbed = require("../../BaseErrorEmbed");
const BaseEmbed = require("../../BaseEmbed");


module.exports = {
    config: {
        name: "botsuggest",
        description: "Sends a suggestion for the bot",
        usage: "<suggestion>",
        category: "bot utilities",
        accessableby: "All",
        aliases: ["bsuggest"],
    },
        run: async (bot, message, args) => {
    
            let suggestion = args.slice(0).join(" ")


            const errorEmbed = BaseEmbed(bot, message)
            .setDescription(`\`\`\`Error details: Missing a required argument\`\`\``)
            .setFooter(`Botsuggest command | ${bot.user.username}`, bot.uer.displayAvatarURL({dynamic: true}))
            
            if(!suggestion) return message.channel.send(errorEmbed);


             message.author.send("Thank you for the suggestion. Your suggestion will be reviewed by the bot owner.")

            const embed = BaseEmbed(bot, message)
            .setTitle("New bot suggestion!")
            .setDescription(`${message.author.username} has a suggestion!`)
            .addField("Suggestion", `\`${suggestion}\``, true)
            .setFooter(`Botsuggest command | ${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
            bot.channels.cache.get("700817293193510923").send(embed).then(async msg => {
                await msg.react("✅")
                await msg.react(":x:")
            })
        }
}