const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "poke",
        description: "Pokes the mentioned user",
        usage: "<mention>",
        accessableby: "Members",
        aliases: [""],
        category: "images",
    },
    run: async (bot, message, args) => {

// Checks for the first mentioned person

        if(!message.mentions.users.first()) return message.channel.send("You must pat someone.")

// Fetches the image 


        fetch("https://nekos.life/api/v2/img/poke")
        .then(res => res.json()).then(body => {
            if(!body) return message.channel.send("<:nah:695770802242715648> |  Whoops! I've broke, try again!")
        
// Makes the Embed

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} !`, message.guild.iconURL())
        .setTitle(`OwO, ${message.author.username} spanked ${message.mentions.users.first().username}. OOF!`)
        .setImage(body.url)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
        })
    }
}