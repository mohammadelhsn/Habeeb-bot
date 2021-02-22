const { MessageEmbed } = require("discord.js");
const { red } = require("../../colours.json")

module.exports = {
    config: {
        name: "hackban",
        description: "Bans a user even if they aren't in the server",
        usage: "<user id> <log channel> <reason> ",
        category: "moderation",
        accessableby: "Admins",
        aliases: ["hb", "hbegone"]
    },
        run: async (bot, message, args) => {

// Defining things

        let user = args[0] // (args1)
        let logChannel = message.mentions.channels.first() // (args2)
        let reason = args.slice(2).join(" ") // (args3)

// Bunch of if statements 

        if(!user) return message.channel.send("<:nah:695770802242715648> | Please speicify a user to ban!")
        if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify the channel you want to log this event in!")        
        if(!reason) return message.channel.send("<:nah:695770802242715648> | Please speicify a reason!")

        if(args[0] === message.author.id) return message.channel.send("<:nah:695770802242715648> | You can't ban yourself, silly")
        if(user === bot.user.id) return message.channel.send("<:nah:695770802242715648> | You can't get the bot to ban itself.")

// Permission check

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | You don't have the permissions to use this command.")
        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417>| I don't have the permissions to execute this command. Please, give me the permissions and try again!")
 
// Ban, send and check for any errors

        message.guild.members.ban(user).catch(e =>{
        if (e) return message.channel.send("<:nah:695770802242715648> | That user has already been banned or I don't have permission or my role isn't high enough!");
        })

// Send a confirmation message to the current channel

        message.channel.send(`<:yeppp:695770802838175834> | <@${args[0]}> has been banned! :hammer:`)

// Make an embed to log the event

        let embed = new MessageEmbed()
        .setColor(red)
        .setAuthor(`${message.guild.name} Moderation-Logs`, message.guild.iconURL())
        .addField("• Moderation", "Hackban", true)
        .addField("• Ban Member", `<@${args[0]}>`, true)
        .addField("• Moderator:", message.author.username, true)
        .addField("• Reason:", reason, true)
        .addField("• Date:", message.createdAt.toLocaleString(), true)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Send to the log channel

        bot.channels.cache.get('779814750716559431').send(embed);
    }
}
