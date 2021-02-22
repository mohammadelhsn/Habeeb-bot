const { MessageEmbed } = require("discord.js");
const { red } = require("../../colours.json");

module.exports = { 
    config: {
        name: "mute", // Command name here!   
        description: "Mutes a mentioned user using a muted role in the server. OOOF",
        usage: "<user> <log channel> <reason> ",
        category: "moderation",
        accessableby: "Members",
        aliases: ["n", "nospeak"] // Aliases here! 
    },
    run: async (bot, message, args) => {
// Check if the user of the command has the permission to use the command. 
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("<a:bruh:525820163044540417> | You don't have the permissions to run this command! Sorry!");

if(!message.guild.me.hasPermission(["MANAGE_ROLES" ||  "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | Please give me the perms! Otherwise I can't run the command! :)")

//define the reason and mute 
let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!mutee) return message.channel.send("<:nah:695770802242715648> | Specify the user otherwise the command won't work :eyes:");

let logChannel = message.mentions.channels.first() 
if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel")

let reason = args.slice(2).join(" ");
if(!reason) return message.channel.send("<:nah:695770802242715648> | Please specify a reason!!")
//define mute role and if it doesn't exist, create one.
let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
if(!muterole) {
    try {
        muterole = await message.guild.createRole({
            name: "Muted",
            color: "#050303",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, ID) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false, 
                SEND_TTS_MESSAGES: false, 
                ATTACH_FILES: false, 
                SPEAK: false,
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

// add role to the mentionned user!
mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`You have been muted in ${message.guild.name} for: ${reason}`)
    message.channel.send(`<:yeppp:695770802838175834> | ${mutee.user.username} was successfully muted!`)
})

//send an embed to the modlogs channel!
let embed = new MessageEmbed()
.setColor(red)
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
.addField("• Moderation:", "Mute", true)
.addField("• Mutee:", mutee.user.username, true)
.addField("• Reason", reason, true )
.addField("• Moderator:", message.author.username, true)
.addField("• Date", message.createdAt.toLocaleString(), true )
.setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
bot.channels.cache.get('779814750716559431').send(embed);
    }
}