const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");

module.exports = { 
    config: {
        name: "cat",
        description: "sends a picture of a cat!",
        usage: "",
        category: "images",
        accessableby: "Members",
        aliases: ["catto"]
    },
    run: async (bot, message, args) => {

// Generating message

    let msg = await message.channel.send("Generating...")

// Fetch the image from the API

    fetch(`http://aws.random.cat/meow`)
    .then(res => res.json()).then(body => {

// If there is no image, (so the bot doesn't crash), it will return        

        if(!body) return message.channel.send("<:nah:695770802242715648> | Whoops! I've broke, try again!")
        
        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} CATS!`, message.guild.iconURL())
        .setImage(body.file)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Send the embed and then delete the "generating" message 

            message.channel.send(embed)
            msg.delete();
        })
    }
}