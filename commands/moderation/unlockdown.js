const { MessageEmbed } = require("discord.js")
const { green } = require("../../colours.json")

module.exports = {
    config: {
        name: "unlockdown",
        description: "Unlocks the current channel",
        usage: "<log channel>",
        category: "moderation",
        accessableby: "Admins",
        aliases: ["unlock"],
    },
    run: async (bot, message, args) => {

// Defining a few things        

        let reason = args.slice(1).join(" ");
        let logChannel = message.mentions.channels.first() 

// Some wonderful if statments

        if(!bot.lockit) bot.lockit = [];
        if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel")
        if(!reason) return message.channel.send("<:nah:695770802242715648> | You must specify a reason!")

// Permissions check

        if(!message.member.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | You don't have the permissions to use this command :)")
        if(!message.guild.me.hasPermission(["MANAGE_CHANNELS", "ADINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | I don't have the permissions to run this command for you!")

// Change the permissions in the channel

        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        })

// Send a message to the locked channel saying that it is locked

        message.channel.send(" | This chat has been locked, please be patient, mods will unlock this channel soon.")

// Make a nice embed

        let embed = new MessageEmbed()
        .setColor(green)
        .setTitle(`Channel unlocked`)
        .setAuthor(`${message.guild.name} Moderation-logs`, message.guild.iconURL())
        .addField("• Moderator:", message.author, true)
        .addField("• Locked channel:", message.channel.name, true)
        .addField("• Date:", message.createdAt.toLocaleString(), true)
        .addField("• Reason", reason, true)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Send the embed to the defined channel

       bot.channels.cache.get('779814750716559431').send(embed);
    }
}