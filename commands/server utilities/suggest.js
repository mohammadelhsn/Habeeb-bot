const { MessageEmbed } = require("discord.js");
var randomColour = '#'+Math.floor(Math.random()* 16777215).toString(16)

module.exports = { 
    config: {
        name: "suggest",    
        description: "Suggets something to the suggestions channel",
        usage: "<suggestion>",
        category: "server utilities", 
        accessableby: "Members", 
        aliases: ["sug"]
    },
    run: async (bot, message, args) => {

        let suggestion = args.slice(0).join(" ")
        if(!suggestion) return message.channel.send("<:nah:695770802242715648> |  | Please specify your suggestion!")

        let embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Suggestions!`, message.guild.iconURL())
        .setColor(randomColour)
        .setDescription("Please react to ✅ or <:nah:695770802242715648>")
        .addField("Suggestion", suggestion, true)
        .addField("Suggested by", message.author.tag, true)
        .addField("Suggested at:", message.createdAt.toLocaleString(), true)

        let sChannel = message.guild.channels.cache.find(c => c.name === "suggestions")
             sChannel.send(embed).then(async msg => {
            await msg.react("✅")
            await msg.react("<:nah:695770802242715648>")
        })
    }
}