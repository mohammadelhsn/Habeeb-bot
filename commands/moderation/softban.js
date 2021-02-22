const { red } = require("../../colours.json"); // requires the colours.json file (required)
const { MessageEmbed } = require("discord.js"); // requires Discord.js (required)



module.exports = { 
    config: {
        name: "softban", // Command name here!   
        description: "Softbans the mentioned user from the server with reason!", // Command description
        usage: "<user> <log channel> <reason>",
        category: "moderation", // How to use this command
        accessableby: "Admins", // Only accessable by those users.
        aliases: ["sb" , "sbegone"] // Aliases here! 
    },
    run: async (bot, message, args) => {
 // Check if the person who is using the command has the proper perms to use the command
    if(!message.member.hasPermission(["BAN_MEMBERS" ||  "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> |  You can't run this command! Nice try though! :)")
// define banMember and reason
    let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!banMember) return message.channel.send("<:nah:695770802242715648> |  Please mention a user to ban! :hammer:")

    let logChannel = message.mentions.channels.first() 
    if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel")

    let reason = args.slice(2).join(" ");
    if(!reason) return message.channel.send("<:nah:695770802242715648> |  Please specify a reason!")
// Find out if the bot has the proper permissions to use the command
    if(!message.guild.me.hasPermission(["BAN_MEMBERS" ||  "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> |  I don't have the permissions needed to ban the user. Please give me them if you want to continue using the command!")
// Delete the invocation command then ban the mentioned user
    message.delete()

    banMember.send(`Hello! You have been banned from ${message.guild.name} for ${reason}`).then(() =>
        message.guild.members.ban(banMember, {reason: reason})).then(() => message.guild.members.unban(banMember.id, {reason: "Softban"})).catch(err => console.log(err))
    
    message.channel.send(`<:yeppp:695770802838175834> |  | ${banMember.user.tag} has been banned! :hammer:`)

    // Make the embed

    let embed = new MessageEmbed()
    .setColor(red)
    .setAuthor(`${message.guild.name} Moderation-Logs`, message.guild.iconURL())
    .addField("• Moderation", "Softban", true)
    .addField("• Ban Member", banMember.user.username, true)
    .addField("• Moderator:", message.author.username, true)
    .addField("• Reason:", reason, true)
    .addField("• Date:", message.createdAt.toLocaleString(), true)
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

    bot.channels.cache.get('779814750716559431').send(embed);       
    }
}