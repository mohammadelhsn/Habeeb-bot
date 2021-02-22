const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "feed",
        description: "Feeds the mentioned user",
        usage: "<mention>",
        category: "images",
        accessableby: "Members",
        aliases: ["givefood"],
    },
    run: async (bot, message, args) => {

// Fetch the picture

        if(!message.mentions.users.first()) return message.channel.send("Mention someone to feed them")

      fetch("https://nekos.life/api/v2/img/feed")
      .then(res => res.json()).then(body => {
        if(!body) return message.channel.send("<:nah:695770802242715648> | Whoops! I've broke, try again!")

// Send the embed 

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setTitle(`${bot.user.username} FED!`, message.guild.iconURL())
        .setAuthor(message.guild.name)
        .setImage(body.url)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
         })
    }
}