const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "pat",
        description: "Pats the mentioned user",
        usage: "<mention>",
        category: "images",
        accessableby: "Members",
        aliases: ["patt"],
    },
    run: async (bot, message, args) => {

// Checks for the first mention

        if(!message.mentions.users.first()) return message.channel.send("Please specify the user you want to pat!")

// Fetches the boddy 

       
        fetch("https://nekos.life/api/pat")
        .then(res => res.json()).then(body => {
            if(!body) return message.channel.send("<:nah:695770802242715648> |  Whoops! I've broke, try again!")

// Makes the embed and sends it

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} !`, message.guild.iconURL())
        .setTitle(`OwO, ${message.author.username} patted ${message.mentions.users.first().username}. Awwwwww`)
        .setImage(body.url)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
        })
    }
}