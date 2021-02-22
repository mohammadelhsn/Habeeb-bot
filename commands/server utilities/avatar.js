const { MessageEmbed } = require("discord.js");
var randomColour = '#'+Math.floor(Math.random()* 16777215).toString(16)

module.exports ={
    config: {
        name: "avatar",
        description: "Diplays an avatar of the mentioned user or yourself",
        usage: "(user)",
        category: "server utilities",
        accessableby: "Members",
        aliases: ["av"]  
    },

    run:  async (bot, message, args) => {

// Make it check for a mentioned user, if there is none, display the author's profile picture.


        const user = message.mentions.users.first() || message.author 

// Create the embed to send including the user's avatar!

        let embed = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL())
        .setColor(randomColour)
        .setImage(user.displayAvatarURL())
        message.channel.send(embed)
    }
}