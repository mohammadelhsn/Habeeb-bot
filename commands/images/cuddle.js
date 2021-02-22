const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = { 
    config: {
        name: "cuddle",
        description: "Cuddle that special person! ",
        usage: "<mention>",
        category: "images",
        accessableby: "Members",
        aliases: [""]
    },
    run: async (bot, message, args) => {

// Define the user who is being mentioned

        let cuddled = message.mentions.users.first()
        if(!cuddled) return message.channel.send("Please mention the user who is to be cuddled!")

// Find the picture and fetch it

        fetch("https://nekos.life/api/v2/img/cuddle")
        .then(res => res.json()).then(body => {
            if(!body) return message.channel.send("<:nah:695770802242715648> | Whoops! I've broke, try again!")
    

// Make the embed and send the embed

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setTitle(`${bot.user.username} CUDDLED!`, message.guild.iconURL())
        .setAuthor(message.guild.name)
        .setImage(body.url)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
        })
    }
}   