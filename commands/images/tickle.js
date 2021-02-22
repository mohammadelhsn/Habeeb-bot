const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "tickle",
        description: "tickles the mentioned user",
        usage: "<mention>",
        accessableby: "Members",
        cateogry: "images",
        aliases: [""],
    },
    run: async (bot, message, args) => {

// Checks for the first person mentioned

        if(!message.mentions.users.first()) return message.channel.send("Please specify a person to tickle")

// Finds the picture and gif


        fetch("https://nekos.life/api/v2/img/tickle")
        .then(res => res.json()).then(body => {
            if(!body) return message.channel.send("<:nah:695770802242715648> | Whoops! I've broke, try again!")

// Makes and sends the embed

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} tickle!`, message.guild.iconURL())
        .setTitle(`OwO, ${message.author.username} slapped ${message.mentions.users.first().username}. Tickle tickle!`)
        .setImage(body.url)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
        })
    }
}