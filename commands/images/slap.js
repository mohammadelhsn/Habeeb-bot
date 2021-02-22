const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "slap",
        description: "Slaps the memtioned user",
        usage: "<mention>",
        accessableby: "Members",
        category: "images",
        aliases: [""],
    },
    run: async (bot, message, args) => {

// Checks for the first person mentioned

        if(!message.mentions.users.first()) return message.channel.send("Please mention a user to be slapped!")

// Fetches the image 


        fetch("https://nekos.life/api/v2/img/slap")
        .then(res => res.json()).then(body => {
            if(!body) return message.channel.send("<:nah:695770802242715648> |  Whoops! I've broke, try again!")

// Creates and sends the embed

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} Slap!`, message.guild.iconURL())
        .setTitle(`OwO, ${message.author.username} slapped ${message.mentions.users.first().username}. OOF!`)
        .setImage(body.url)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
        })
    }
}