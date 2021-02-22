const { MessageEmbed } = require("discord.js")
const { red } = require("../../colours.json")

module.exports = {
    config: {
        name: "lockdown",
        description: "locks the channel that you are currently in.",
        usage: "<log channel>",
        category: "moderation",
        accessableby: "admins",
        aliases: ["raid"],
    },
    run: async (bot, message, args) => {
        if(!bot.lockit) bot.lockit = [];
        let logChannel = message.mentions.channels.first() 
        if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel")
        let reason = args.slice(1).join(" ");
        if(!reason) return message.channel.send("<:nah:695770802242715648> | You must specify the reason why you are locking this channel.")
        if(!message.member.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | You don't have the permissions to run this command!")
        if(!message.guild.me.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | I don't have the correct permissions to fulfill this command for you.")

        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        })
        message.channel.send("<:yeppp:695770802838175834> | This chat has been locked, please be patient, mods will unlock this channel soon.")

        let embed = new MessageEmbed()
        .setColor(red)
        .setTitle(`Channel locked`)
        .setAuthor(`${message.guild.name} Moderation-logs`, message.guild.iconURL())
        .addField("• Moderator:", message.author, true)
        .addField("• Locked channel:", message.channel.name, true)
        .addField("• Date:", message.createdAt.toLocaleString(), true)
        .addField("• Reason", reason, true)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        bot.channels.cache.get('779814750716559431').send(embed);
    }
}