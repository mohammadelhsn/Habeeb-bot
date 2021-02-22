const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "kiss",
        description: "Kisses the mentioned user",
        usage: "<mention>",
        category: "images",
        accessableby: "Members",
        aliases: ["mwah"]
    },
    run: async  (bot, message, args) => {

//  Checks for the first mention, that will later be used

        if(!message.mentions.users.first()) return message.channel.send("Please mention someone to kiss!")

//  Fetches the picture / gif

        fetch("https://nekos.life/api/kiss")
        .then(res => res.json()).then(body => {
            if(!body) return message.channel.send("<:nah:695770802242715648> |  Whoops! I've broke, try again!")


// Creates a embed to send the picture in  :)

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} !`, message.guild.iconURL())
        .setTitle(`OwO, ${message.author.username} kissed ${message.mentions.users.first().username}. Awwwwww`)
        .setImage(body.url)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
        })
    }
}