const { MessageEmbed } = require("discord.js");
var randomColour = '#'+Math.floor(Math.random()* 16777215).toString(16)
const fetch = require("node-fetch");

module.exports = { 
    config: {
        name: "alpaca",
        description: "sends a picture of an alpaca!",
        usage: "",
        category: "images",
        accessableby: "Members",
        aliases: ["alpac"]
    },
    run: async (bot, message, args) => {

// Defines the Generating message

    let msg = await message.channel.send("Generating...")
    
// Fetching the image from the API

    fetch(`https://apis.duncte123.me/alpaca`)
    .then(res => res.json()).then(body => {
        if(!body) return message.channel.send("<:nah:695770802242715648> |  | Whoops! I've broke, try again!")


// Creating the embed to send the picture in

        let embed = new MessageEmbed()
        .setColor(randomColour)
        .setAuthor(`${bot.user.username} ALPACA!`, message.guild.iconURL())
        .setImage(body.data.file)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Sends the embed to the channel and deletes the "Generating" message

            message.channel.send(embed)
            msg.delete();
        })
    }
}