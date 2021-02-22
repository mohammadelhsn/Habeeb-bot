const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");    

module.exports = {
    config: {
        name: "dog",  
        description: "Sends a picture of a dog! AWWWW!",
        usage: "",
        category: "images",
        accessableby: "Members",
        aliases: ["dogs" , "doggy"] 
    },
run: async (bot, message, args) => {

// Send Generating message

    let msg = await message.channel.send("Generating....")

// Fetch the picture 

    fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(res => res.json()).then(body => {
     if(!body) return message.channel.send("<:nah:695770802242715648> | The website failed, please try again! ")

    let embed = new MessageEmbed()
    .setColor(cyan)
    .setAuthor('Dogs!' , message.guild.iconURL())
    .setImage(body.message)
    .setTimestamp()
    .setFooter("DOGS!", bot.user.displayAvatarURL())

// Send the embed and delete the "generating" message

    message.channel.send(embed)
     msg.delete();
         })
    }
}