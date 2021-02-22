const { MessageEmbed } = require("discord.js");
var randomColour = '#'+Math.floor(Math.random()* 16777215).toString(16)

module.exports ={
    config: {
        name: "channelinfo",
        description: "Find channel info",
        usage: "<channel mention>",
        category: "server utilities",
        accessableby: "Members",
        aliases: ["ci"] // Aliases here! 
    },

    run:  async (bot, message, args) => {

// Creating an array

            const channel = message.mentions.channels.first() || message.channel

            let channelinfo = {}
            channelinfo.createdAt = channel.createdAt
            channelinfo.createdTimestamp = channel.createdTimestamp
            channelinfo.deleted = `${message.channel.deleted ? "Yes" : "No"}`
            channelinfo.type = channel.type
            channelinfo.id = channel.id
            channelinfo.name = channel.name
            channelinfo.nsfw = `${message.channel.nsfw ? "Yes" : "No"}`
            channelinfo.guild = channel.guild
            channelinfo.viewable = `${message.channel.viewable ? "Yes" : "No"}`
            channelinfo.topic = `${message.channel.topic ? message.channel.topic : "None"}`


// Making the embed with the help of the embed

            let embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Channel Info`)
            .setColor(randomColour)
            .addField("• Channel name:", channelinfo.name, true)
            .addField("• Channel ID", channelinfo.id, true)
            .addField("• Channel type:", channelinfo.type, true)
            .addField("• Channel Deletable?", channelinfo.deleted, true)
            .addField("• Channel Created At", channelinfo.createdAt, true)
            .addField("• Channel Created Timestamp", channelinfo.createdTimestamp, true)
            .addField("• Channel is NSFW", channelinfo.nsfw, true)
            .addField("• Channel guild", channelinfo.guild, true)
            .addField("• Channel viewable", channelinfo.viewable, true)
            .addField("• Channel info", channelinfo.topic, true)
            .setThumbnail(message.guild.iconURL())
            message.channel.send(embed)
    }
}