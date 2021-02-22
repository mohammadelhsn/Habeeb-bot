const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json")


module.exports = {
    config: {
        name: "sexyrate",
        description: "Sexy rate",
        usage: "",
        category: "fun",
        accessableeby: "Members",
        aliases: ["sexyr8"],
    },
    run: async (bot, message, args) => {
        let sexyrate = Math.floor(Math.random() * 100)

        let embed  = new MessageEmbed()
        
        .setColor(cyan)
        .addField(":heart: Sexy rate :heart:", "I rate you a " + sexyrate + " out of 100 on the sexy scale")
        .setThumbnail(message.author.displayAvatarURL())
        message.channel.send(embed)
    }
}