const { MessageEmbed } = require("discord.js");
const { red } = require("../../colours.json");


module.exports = { 
    config: {
        name: "report", // Command name here!   
        description: "Reports the mentioned user to the mods! Oh no!",
        usage: "<user> <log channel> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["rep"] // Aliases here! 
    },
    run: async (bot, message, args) => {

    message.delete()
    // Mentioned or grabbed user
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!target) return message.channel.send("<:nah:695770802242715648> | Please mention a user to report!!").then(m => m.delete(15000))

    // Define reason 
        let reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send(`<:nah:695770802242715648> | Please specify the reason why you are reporting **${target.user.username}**`).then(m => m.delete(15000))


    // Send an embed including the report in it!
    let embed = new MessageEmbed()
    .setColor(red)
    .setAuthor(`${message.guild.name} Reports`, message.guild.iconURL())
    .setDescription("Please react to <:yeppp:695770802838175834> |  or <:nah:695770802242715648> ")
    .addField("• Moderation:", "Report", true)
    .addField("• Target", target.user.username, true)
    .addField("• Reported  by:", message.author.username, true)
    .addField("• Reason:", reason, true)
    .addField("• Date:", message.createdAt.toLocaleString(), true)
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

        // Send the report to the reports channel
    bot.channels.cache.get('779814750716559431').send(embed).then(async msg => {
        await msg.react("<:yeppp:695770802838175834>")
        await msg.react("<:nah:695770802242715648>")
    })

               }

    }

