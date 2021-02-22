const { MessageEmbed } = require("discord.js")
const { green } = require("../../colours.json")

module.exports = {
    config: {
        name: "setnick",
        description: "sets the mentioned users nickname",
        usage: "<mention> <log channel> <new name>",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["nickset", "nickname", "changename"],
    },
    run: async (bot, message, args) => {

// Checking for permissions

        if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | You don't have the permissions to use this command!")
        if(!message.guild.me.hasPermission(["MANGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | I dont have permissions to run this command!")

// Defining mention, nickname, logchannel ; checking for them ; returning if they don't exist

        let user = message.mentions.users.first() 
        let logChannel = message.mentions.channels.first() 
        let newName = args.slice(2).join(" ")

        if(!user) return message.channel.send("<:nah:695770802242715648> | You must mention a member!")
        if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel")
        if(!newName) return message.channel.send("<:nah:695770802242715648> | You must mention a new name to change to!")

// Change nickname
        
        message.guild.member(user).setNickname(newName).catch(console.error)

// Send an embed to the logs

        let embed = new MessageEmbed()
        .setColor(green)
        .setAuthor(`${message.guild.name} Action-logs`, message.guild.iconURL())
        .addField("• Moderation:", "Setnick", true)
        .addField("• Target", user.username, true)
        .addField("• Moderator:", message.author.username, true)
        .addField("• Date:", message.createdAt.toLocaleString(), true)
        .addField("• New nickname", newName, true)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        bot.channels.cache.get('779814750716559431').send(embed);
    }
}
