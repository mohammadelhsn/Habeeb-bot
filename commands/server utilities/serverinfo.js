const { MessageEmbed } = require("discord.js");
var randomColour = '#'+Math.floor(Math.random()* 16777215).toString(16)


module.exports = {
    config: {
        name: "serverinfo",  
        description: "Shows the servers info", 
        usage: "", 
        category: "utilities",
        accessableby: "Members", 
        aliases: ["si"] 
    },
run: async (bot, message, args) => {



    let serverinfo = {};
        serverinfo.available = message.guild.available ? "Yes" : "No"
        serverinfo.createdAt = message.guild.createdAt
        serverinfo.explicitContentFilter = message.guild.explicitContentFilter
        serverinfo.id = message.guild.id
        serverinfo.joinedAt = message.guild.joinedAt
        serverinfo.joinedTimestamp = message.guild.joinedTimestamp
        serverinfo.large = message.guild.large ? "Yes" : "No"
        serverinfo.memberCount = message.guild.memberCount
        serverinfo.humans = `${message.guild.members.cache.filter(member => !member.user.bot).size}`
        serverinfo.bots = `${message.guild.members.cache.filter(member => member.user.bot).size}`
        serverinfo.totalChannels = `${message.guild.channels.cache.size}`
        serverinfo.totalTextChannels = `${message.guild.channels.cache.filter(ch => ch.type === "text")}`
        serverinfo.totalVoiceChannels = `${message.guild.channels.cache.filter(ch => ch.type === "voice")}`
        serverinfo.name = message.guild.name
        serverinfo.owner = message.guild.owner
        serverinfo.ownerID = message.guild.ownerID
        serverinfo.partnered = message.guild.partnered ? "Yes" : "No"
        serverinfo.premiumSubscriptionCount = message.guild.premiumSubscriptionCount
        serverinfo.premiumTier = message.guild.premiumTier
        serverinfo.region = message.guild.region 
        serverinfo.verificationLevel = message.guild.verificationLevel
        serverinfo.verified = message.guild.verified ? "Yes" : "No"
        serverinfo.roleCount = `${message.guild.roles.cache.size}`
        serverinfo.roles = `${message.guild.roles.cache.map(role => role.toString()).join(" ")}`


        let embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Info`)
        .setColor(randomColour)
        .addField("• Server name", serverinfo.name, true)
        .addField("• Server ID", serverinfo.id, true)
        .addField("• Server region", serverinfo.region, true)
        .addField("• Server owner", serverinfo.owner, true)
        .addField("• Server owner ID", serverinfo.ownerID, true)
        .addField("• Server membercount", serverinfo.memberCount, true)
        .addField("• Server human count", serverinfo.humans, true)
        .addField("• Server bot count", serverinfo.bots, true)
        .addField("• Server boost count", serverinfo.premiumSubscriptionCount, true)
        .addField("• Server boost tier", serverinfo.premiumTier, true)
        .addField("• Server Verification Level", serverinfo.verificationLevel, true)
        .addField("• Server Explicit Content filter level", serverinfo.explicitContentFilter, true)
        .addField("• Server created", serverinfo.createdAt, true)
        .addField("• Server joined", serverinfo.joinedAt, true)
        .addField("• Server joined Timestamp", serverinfo.joinedTimestamp, true)
        .addField("• Server available?", serverinfo.available, true)
        .addField("• Large (250+ members)", serverinfo.large, true)
        .addField("• Server partnered?", serverinfo.partnered, true)
        .addField("• Server verified", serverinfo.verified, true)
        .addField("• Server channel count:", serverinfo.totalChannels, true)
        .addField("• Server Text channel count", serverinfo.totalTextChannels, true)
        .addField("• Server voice channel count", serverinfo.totalVoiceChannels, true)
        message.channel.send(embed)
    }
}