const { MessageEmbed } = require("discord.js");
const ms = require("ms")
const { red, green } = require("../../colours.json")

module.exports = {
    config: {
        name: "tempmute",
        description: "Temporarily mutes the mentioned user",
        category: "moderation",
        accessableby: "Moderators",
        usage: "<user> <time> <log channel> <reason>",
        aliases: ["tempm", "softmute"],
    },
    run: async (bot, message, args) => {

// Permissions check

        if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | You don't have the proper permissions to use this command.")
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | I don't have the permissions to run this command, sorry.")

// Define some variables

        let tomute = message.mentions.users.first() || message.guild.membrs.get(args[0])
        let mutetime = args[1]
        let logChannel = message.mentions.channels.first() 
        let reason = args.slice(3).join(" ")
        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")

// Some if statements        

        if(!tomute) return message.channel.send("<:nah:695770802242715648> | Please mention someone to mute!")
        if(!mutetime) return message.channel.send("<:nah:695770802242715648> | Please specify a time.")
        if(!logChannel) return message.channel.send("<:nah:695770802242715648> | Please specify a channel")
        if(!reason) return message.channel.send("<:nah:695770802242715648> | Please specify a reason for the mute!")


        if(!muterole) {
            try {
             muterole = await message.guild.cache.createRole({
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

// Make a moderation embed for the beginning of the timed mute

        let embed = new MessageEmbed()
        .setColor(red)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("• Moderation:", "Temp-Muted", true)
        .addField("• Mutee:", tomute.username, true)
        .addField("• Reason", reason, true )
        .addField("• Moderator:", message.author.username, true)
        .addField("• Date", message.createdAt.toLocaleString(), true )
        .addField("• Time Muted", mutetime, true)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Send the embed to the defined channel above

        bot.channels.cache.get('779814750716559431').send(embed);

// Add the role to the target
        
        message.guild.member(tomute).roles.add(muterole)

// Send a confirmation message

        message.channel.send(`Successfully muted **${tomute.username}** for **${mutetime}**`)

// Make an embed for end of mute

        setTimeout(function(){
            let uembed = new MessageEmbed()
            .setColor(green)
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("• Moderation:", "User unmuted", true)
            .addField("• Mutee:", tomute.username, true)
            .addField("• Reason", reason, true )
            .addField("• Moderator:", message.author.username, true)
            .addField("• Date", message.createdAt.toLocaleString(), true )
            .addField("• Time Muted", mutetime, true)
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

// Remove the role

            message.guild.member(tomute).roles.remove(muterole)

// Send the embed to the log channel, defined above

        bot.channels.cache.get('779814750716559431').send(uembed);   
        }, ms(mutetime))
    }
}