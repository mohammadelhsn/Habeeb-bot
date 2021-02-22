const { MessageEmbed } = require("discord.js");
const { green } = require("../../colours.json")

module.exports = { 
    config: {
        name: "addrole", // name of the commnad
        description: "This is the command used to add a role to the mentioned user",
        usage: "<user> <role> <log channel> <reason>",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["roleadd"]
    },
    run: async (bot, message, args) => {
 
// Permissions check

    if(!message.member.hasPermission(["MANAGE_ROLES" || "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | You don't have the proper permissions to use this command.")
    if(!message.guild.me.hasPermission(["MANAGE_ROLES" ||  "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | I don't have the permissions to be able to fulfill the command.")

// Defining a few things

    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    let role = message.guild.roles.cache.find(r => r.name === args[1]) || message.guild.roles.cache.find(r => r.id === args[1]) || message.mentions.roles.first()
    let logChannel = message.mentions.channels.first() 
    let reason = args.slice(3).join(" ");

// Some nice if statements

    if(!rMember) return message.channel.send("<:nah:695770802242715648> | Please provide a user to add the role to")
    if(!role) return message.channel.send("<:nah:695770802242715648> | Please mention a role to add to the user")
    if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify the channel you want to log this event in!")        
    if(!reason) return message.channel.send("<:nah:695770802242715648> | Please provide a reason")
   
// If they have the role return ; else add the role console.log any errors

    if(rMember.roles.cache.has(role.id)) {
        return message.channel.send(`<:nah:695770802242715648> |  ${rMember.displayName} already has the role`)
    } else {
        await rMember.roles.add(role.id).catch(e => console.log(e.message))
        message.channel.send(`<:yeppp:695770802838175834> | The role ${role.name}, has been added to ${rMember.displayName}`)
    }

// Make a nice embed

    let embed = new MessageEmbed()
    .setColor(green)
    .setTitle(`Role added`)
    .setAuthor(`${message.guild.name} Role-Logs`, message.guild.iconURL())
    .addField("• Added to:", rMember.user.username, true)
    .addField("• Moderator", message.author.username, true)
    .addField("• Reason", reason, true)
    .addField("• Role added:", role.name, true)
    .addField("• Date:", message.createdAt.toLocaleString(), true)
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Send the embed

    bot.channels.cache.get('779814750716559431').send(embed);
    }
}