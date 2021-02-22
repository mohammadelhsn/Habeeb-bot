const { red } = require("../../colours.json")
const { MessageEmbed } = require("discord.js");

module.exports= { 
    config: {
        name: "warn",  
        description: "Warns the mentioned user", 
        usage: "<user> <log channel> <reason>",
        category: "moderation", 
        accessableby: "Moderator", 
        aliases: ["w"],
    },
    run: async (bot, message, args) => {

// Checking for permissions

        if(!message.member.hasPermission(["MANAGE_MESSAGES" || "ADMINISTRATOR"])) return  message.channel.send("<a:bruh:525820163044540417> |  You don't have the permissions to use this command!")
        if(!message.guild.me.hasPermission(["MANAGE_MESSAGES" || "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> |  I don't have the permissions to run this command!")


// Define a few things

        let warnMember = message.mentions.users.first()
        let logChannel = message.mentions.channels.first() 
        let reason = args.slice(1).join(" ")

// If statements

        if(!warnMember) return message.channel.send("<:nah:695770802242715648> |  Please specify the user you want to warn!")
        if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel to log this event in!")
        if(!reason) return message.channel.send("<:nah:695770802242715648> |  Please specify a reason!")

// DM the warned member that they have been warned

        warnMember.send(`You have been warned for ${reason}!`)

// Make a nice embed to send to the log channel

        let embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Moderation Logs`, message.guild.iconURL())
        .setColor(red)
        .setTimestamp()
        .addField("• Action", "Warning", true)
        .addField("• User:", `${warnMember.username}#${warnMember.discriminator}`, true)
        .addField("• Moderator", `${message.author.username}#${message.author.discriminator}`, true)
        .addField("• Reason:", reason, true)
        .addField("• Date:", message.createdAt.toLocaleString(), true)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Send the defined channel above

        bot.channels.cache.get('779814750716559431').send(embed);
    }
}