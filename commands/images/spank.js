const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "spank",
        description: "Spanks the mentioned user",
        usage: "<mention>",
        accessableby: "Members",
        category: "images",
        aliases: ["spanky"],
    },
    run: async (bot, message, args) => {
        
// Checks if the channel where the command is being used is marked as NSFW, otherwise it will return a message.

        if(!message.channel.nsfw) return message.channel.send("<:nah:695770802242715648> | This command can't be used here")

// Checks for the mention

        if(!message.mentions.users.first()) return message.channel.send("<:nah:695770802242715648> | Please mention someone to smack")

// Defining a variable for later use for logging.

        let currentChannel = message.channel.name 


        fetch("https://nekos.life/api/v2/img/spank")
        .then(res => res.json()).then(body => {
                if(!body) return message.channel.send("❌ | Whoops! I've broke, try again!")

// Creates the embed where the image will be sent

        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} spank!`, message.guild.iconURL())
        .setTitle(`OwO, ${message.author.username} spanked ${message.mentions.users.first().username}. OOF!`)
        .setImage(body.url)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
        })

// Logs the usage of an NSFW command, just to be safe.

        let mEmbed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} logs.`, message.guild.iconURL())
        .addField("User", message.author, true)
        .addField("Command used in:", currentChannel, true)
        .addField("Channel marked as nsfw?", message.channel.nsfw ? "Yes": "No", true)
        
        let sChannel = message.guild.channels.cache.find(c => c.name === "moderation-logs")
        sChannel.send(mEmbed)
        if(!sChannel) return message.channel.send("<:nah:695770802242715648> | There is no `#moderation-logs` channel, therefore this event will not be logged")
    }
}