const { red } = require("../../colours.json"); 
const { MessageEmbed } = require("discord.js"); 



module.exports= {
    config: {
        name: "ban",   
        description: "Bans the mentioned user from the server with reason!", 
        usage: "<user> <log channel> <reason>",
        accessableby: "Admins",
        category: "moderation", 
        aliases: ["b" , "begone"] 
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS" ||  "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | You can't run this command! Nice try though! :)")
    if(!message.guild.me.hasPermission(["BAN_MEMBERS" || "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | I don't have the permissions needed to ban the user. Please give me them if you want to continue using the command!")

    let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag === args[0])
    let logChannel = message.mentions.channels.first() 
    let reason = args.slice(2).join(" ");



    if(!banMember) return message.channel.send("<:nah:695770802242715648> | Please mention a user to ban! :hammer:")
    if(banMember.id === message.author.id) return message.channel.send("<:nah:695770802242715648> | You can't ban yourself, silly")
    if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify the channel you want to log this event in!")        
    if(!reason) return message.channel.send("<:nah:695770802242715648> | Please include a reason!")

   
    
    message.delete()

    banMember.send(`You have been banned from ${message.guild.name} for ${reason}`).then(() =>
        message.guild.members.ban(banMember, {days: 1, reason: reason})).catch(e =>{
        if (e) return message.channel.send("<:nah:695770802242715648> | That user has already been banned or I don't have permission or my role isn't high enough!");
            })
    
    message.channel.send(`<:yeppp:695770802838175834> | ${banMember.user.tag} has been banned! :hammer:`)

    let embed = new MessageEmbed()
    .setColor(red)
    .setTitle(`${message.guild.name} Moderation-Logs`, message.guild.iconURL())
    .addField("• Moderation", "Ban", true)
    .addField("• Ban Member", banMember.user.username, true)
    .addField("• Moderator:", message.author.username, true)
    .addField("• Reason:", reason, true)
    .addField("• Date:", message.createdAt.toLocaleString(), true)
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
    bot.channels.cache.get('779814750716559431').send(embed);
    }
}