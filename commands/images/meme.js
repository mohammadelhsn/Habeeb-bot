const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "meme",
        description: "Sends a meme from a website!",
        usage: "",
        category: "images",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        
// Sends the "generating" message

    let msg = await message.channel.send("Generating...")

// Fetches the picture

    fetch("https://apis.duncte123.me/meme")
    .then(res => res.json()).then(body => {
        if(!body) return message.channel.send("<:nah:695770802242715648> |  Whoops! I've broke, try again!")

// Makes the embed

        let mEmbed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} MEMES!`, message.guild.iconURL())
        .setTitle(body.data.title)
        .setImage(body.data.image)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Sends the embed and then deletes the "generating" message

            message.channel.send(mEmbed)
            msg.delete();
        })
    }
}