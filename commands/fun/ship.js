const { MessageEmbed } = require("discord.js")
const { red } = require("../../colours.json")

module.exports = {
    config: {
        name: "ship",
        description: "ships the two mentioned users",
        usage: "<mention1> <mention2>",
        category: "miscellaneous",
        accessableby: "fun",
        aliases: [""],
    }, 
    run: async (bot, message, args) => {
        let mention1 = args[0] || message.guild.members.cache.find(m => m.user.tag === args[0])
        let mention2 = args.slice(1).join(" ") || message.guild.members.cache.find(m => m.user.tag === args[1])

        if(!mention1) return message.channel.send("Please specify the first person you want to ship")
        if(!mention2) return message.chanel.send("Please specify the second person you want to ship")

        var ship = Math.floor(Math.random() * 100) + 1;
        
        if (50 <= 50) {
            let badmatch = new MessageEmbed()
            .setColor(red)
            .setTitle(`${mention1.username} and ${mention2.username} dont ship well. Oof`)
            .setDescription(`:broken_heart: ${ship}% :broken_heart:`)
            message.channel.send(badmatch)
        } else if (ship === 100) {
            let perfectMatch = new MessageEmbed()
            .setColor(red)
            .setTitle(`${mention1.username} and ${mention2.username} are meant for each other! :eyes:`)
            .setDescription(`:heart_eyes: ${ship}% :heart_eyes:`)
            message.channel.send(perfectMatch)
        } else {
            let match = new MessageEmbed()
            .setColor(red)
            .setTitle(`${mention1.username} and ${mention2.username} match well`)
            .setDescription(`:heart: ${ship}% :heart:`)
            message.channel.send(match)
        }
    }
}