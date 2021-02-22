const { MessageEmbed } = require("discord.js");
const { red } = require("../../colours.json");

module.exports= { 
    config: {
        name: "kick",    
        description: "Kicks the mentioned user from the server with reason!", 
        usage: "<user> <logChannel> <reason>",
        category: "moderation", 
        accessableby: "Moderator", 
        aliases: ["k"] 
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS" || "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | Sorry! You don't have permission to use this command! Nice try though!")

    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!kickMember) return message.channel.send("<:nah:695770802242715648> | Please mention a user to kick")
    if(kickMember === message.author.id) return message.channel.send("<:nah:695770802242715648> | You can't kick yourself silly")

    let logChannel = message.mentions.channels.first() 
    if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel")

    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("<:nah:695770802242715648> | Please specify a reason!")

    if(!message.guild.me.hasPermission(["KICK_MEMBERS" || "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | I don't have the permissions to run this command!")

    kickMember.send(`You have been kicked for ${message.guild.name} for: ${reason} `).then(() =>
    kickMember.kick()).catch(err => console.log(err))

    message.channel.send(`<:yeppp:695770802838175834> | **${kickMember.user.tag} has been kicked :boot:**`).then(m => m.delete(5000))

    let embed = new MessageEmbed()
    .setColor(red)
    .setAuthor(`${message.guild.name} Moderation-Logs`, message.guild.iconURL())
    .addField("• Moderation:", "Kick", true)
    .addField("• Mutee:", kickMember.user.username, true)
    .addField("• Moderator:", message.author.username, true)
    .addField("• Reason:", reason, true)
    .addField("• Date:", message.createdAt.toLocaleString(), true)
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
    bot.channels.cache.get('779814750716559431').send(embed);
    }
}