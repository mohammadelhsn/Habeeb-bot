const { MessageEmbed } = require("discord.js");
const { green } = require("../../colours.json");

module.exports = {
    config: {
        name: "unban",
        description: "Unbans the mentioned user",
        usage: "<user> <log channel> <reason>",
        category: "moderation",
        accessableby: "Admins",
        aliases: ["ub", "unbegone"]
    },
    run: async (bot, message, args) => {
  
// Permissions check

        if(!message.member.hasPermission(["BAN_MEMBERS" ||  "ADMINISTRATOR"])) return  message.channel.send("<a:bruh:525820163044540417> | You don't have the permissions to run this command! Nice try though!")
        if(!message.guild.me.hasPermission(["BAN_MEMBERS" ||  "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> |  I don't have the perms to run this command!")

// Define some variables

        let bannedMember = await bot.fetchUser(args[0])
        let logChannel = message.mentions.channels.first() 
        let reason = args.slice(2).join(" ")

// Argument check 

        if(!bannedMember) return message.channel.send("<:nah:695770802242715648> |  Please mention a user to unban!")
        if(!logChannel) return message.channel.send("Please specify a channel to log this event in")
        if(!reason) return message.channel.send("<:nah:695770802242715648> |  Please specify a reason!")

// Unban user and send the the message to the channel saying they were unbanned

            message.delete()
            try {
                guild.members.unban(bannedMember , {reason: reason});
                message.channel.send(`<:yeppp:695770802838175834> | ${bannedMember.tag} has been unbanned from the server! :tada:`)
            } catch(e) {
                console.log(e.message)
            }

// Create a nice embed to send to the logs

            let embed = new MessageEmbed()
            .setColor(green)
            .setAuthor(`${message.guild.name} Moderation-Logs`, message.guild.iconURL())
            .addField("• Moderation", "Unban", true)
            .addField("• Moderated on", bannedMember.username, true)
            .addField("• Moderator", message.author.username, true)
            .addField("• Reason:", reason, true)
            .addField("• Date:", message.createdAt.toLocaleString(), true)
            .setThumbnail(bannedMember.displayavatarURL())

// Send the embed to the defied channel above

            bot.channels.cache.get('779814750716559431').send(embed);
    }
}
