const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");

module.exports = { 
    config: {
        name: "seal",
        description: "sends a picture of a seal!",
        usage: "",
        category: "images",
        accessableby: "Members",
        aliases: ["se"]
    },
    run: async (bot, message, args) => {

// Sends the generating message
    
    let msg = await message.channel.send("Generating...")

// Fetches the video / picture

    fetch(`https://apis.duncte123.me/seal`)
    .then(res => res.json()).then(body => {

// If the API breaks it will send a message

        if(!body) return message.channel.send("<:nah:695770802242715648> |  Whoops! I've broke, try again!")

// Creates the embed

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} SEALS!`, message.guild.iconURL())
        .setImage(body.data.file)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Sends the embed and deletes the generating message

            message.channel.send(embed)
            msg.delete();
        })
    }
}