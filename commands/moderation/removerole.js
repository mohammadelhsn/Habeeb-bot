const { MessageEmbed } = require("discord.js");
const { green } = require("../../colours.json")

module.exports = { 
    config: {
        name: "removerole",
        description: "This is the command used to remove a role to the mentioned user",
        usage: "<user> <role> <log channel> <reason>",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["roleminus"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES" ||  "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | You don't have the proper permissions to use this command.")
    if(!message.guild.me.hasPermission(["MANAGE_ROLES" || "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | I don't have the permissions to be able to fulfill the command.")

    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    if(!rMember) return message.channel.send("<:nah:695770802242715648> | Please provide a user to remove the role from")
    let role = message.guild.roles.cache.find(r => r.name === args[1]) || message.guild.roles.cache.find(r => r.id === args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("<:nah:695770802242715648> | Please mention a role to remove from the user")
    let logChannel = message.mentions.channels.first() 
    if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel")
    let reason = args.slice(3).join(" ")
    if(!reason) return message.channel.send("<:nah:695770802242715648> | Please provide a reason")

    

    if(!rMember.roles.has(role.id)) {
        return message.channel.send(`<:nah:695770802242715648> | ${rMember.displayName} doesn't have the role`)
    } else {
        await rMember.removeRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`<:yeppp:695770802838175834> | The role ${role.name}, has been removed from ${rMember.displayName}`)
    }

    let embed = new MessageEmbed()
    .setColor(green)
    .setTitle(`Role removed`)
    .setAuthor(`${message.guild.name} Role-Logs`, message.guild.iconURL())
    .addField("• Added to:", rMember.user.username, true)
    .addField("• Moderator", message.author.username, true)
    .addField("• Reason", reason, true)
    .addField("• Role removed:", role.name, true)
    .addField("• Date:", message.createdAt.toLocaleString(), true)
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
    bot.channels.cache.get('779814750716559431').send(embed);
    }
}