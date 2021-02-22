const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "shibe",
        description: "Sends a picture of a Shiba Inu (doge)",
        usage: "",
        accessableby: "Members",
        category: "images",
        aliases: ["doge", "shiba"],
    },
    run: async (bot, message, args) => {

// Get the image / gif


        fetch(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`)
        .then(res => res.json()).then(body => {
            if(!body) return message.channel.send("<:nah:695770802242715648> |  Whoops! I've broke, try again!")

// Creates the embed

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} SHIBE!`, message.guild.iconURL())
        .setImage(body[0])
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
        })
    }
}