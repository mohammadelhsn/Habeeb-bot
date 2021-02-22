const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "hug",
        description: "Hug that special person :)",
        usage: "<mention>",
        category: "images",
        accessableby: "Members",
        aliases: ["hold"],
    }, 
    run: async (bot, message, args) => {

// Checks for the first mention, that will later be used 

        if(!message.mentions.users.first()) return message.channel.send("Please specify the person you want to hug")

// Looks for the hug picture / gif
        fetch("https://nekos.life/api/hug")
        .then(res => res.json()).then(body => {
        if(!body) return message.channel.send("<:nah:695770802242715648> | Whoops! I've broke, try again!")

// Creates a nice embed to send it in

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} !`, message.guild.iconURL())
        .setTitle(`OwO, ${message.author.username} hugged ${message.mentions.users.first().username}. Awwwwww`)
        .setImage(body.url)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
        })
    }
}