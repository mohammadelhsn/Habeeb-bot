const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "llama",
        description: "Sends a llama from a website!",
        usage: "",
        category: "images",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

// Sends the "generating" message

    let msg = await message.channel.send("Generating...")

// Fetches the picture

    fetch("https://apis.duncte123.me/llama")
    .then(res => res.json()).then(body => {
        if(!body) return message.channel.send("<:nah:695770802242715648> |  Whoops! I've broke, try again!")

// Makes the embed 

        let mEmbed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} LLAMAS!`, message.guild.iconURL())
        .setImage(body.data.file)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Sends the embed and deletes the "generating" message

            message.channel.send(mEmbed)
            msg.delete();
        })
    }
}