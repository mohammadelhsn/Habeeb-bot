const { green } = require("../../colours.json");
const { MessageEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "unmute",  
        description: "Unmutes the mentioned user with reason",
        usage: "<user> <log channel> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["speakagain"] 
       },
    run: async (bot, message, args) => {


    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("<a:bruh:525820163044540417> |  You don't have the permissions to run this command! Sorry!");
    if(!message.guild.me.hasPermission(["MANAGE_ROLES" ||  "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> |  Please give me the perms! Otherwise I can't run the command! :)")


    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let logChannel = message.mentions.channels.first() 
    let reason = args.slice(1).join(" ");
    let muterole = message.guild.roles.cache.find(r => r.name === "Muted")

// Some if statments

    if(!mutee) return message.channel.send("<:nah:695770802242715648> |  Specify the user otherwise the command won't work :eyes:");
    if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel to log this event in")
    if(!reason) return message.channel.send("<:nah:695770802242715648> |  Please specify a reason!")
    if(!muterole) return message.channel.send("<:nah:695770802242715648> |  There is no role to remove")

// Remove the role

    mutee.removeRole(muterole.id).then(() => {
        message.delete()

// Send a DM to the user that is going to be muted     
        
        mutee.send(`You have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
        message.channel.send(`<:yeppp:695770802838175834> | ${mutee.user.username} was unmuted! :tada:`)
    })

// Make a nice embed to send to the logs 
    

    let embed = new MessageEmbed()
    .setColor(green)
    .setAuthor(`${message.guild.name} Moderation Logs`, message.guild.iconURL())
    .addField("• Moderation:", "Unmute", true)
    .addField("• Mutee", mutee.user.username, true)
    .addField("• Moderator:", message.author.username, true)
    .addField("• Reason:", reason, true)
    .addField("• Date:", message.createdAt.toLocaleString(), true)
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Send the embed to the defined channel above

        bot.channels.cache.get('779814750716559431').send(embed);
    }
}