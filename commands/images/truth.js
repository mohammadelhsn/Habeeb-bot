const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "truth",
        description: "",
        usage: "<truth>",
        category: "images",
        accessableby: "members",
        aliases: ["scrolloftruth"],
    },
    run: async (bot, message, args) => {

// Creaates and sends the embed
        
        if(!args[0]) return message.channel.send("<:nah:695770802242715648> | Provide a truth")
        let embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} SROLL OF TRUTH`, message.guild.iconURL())
        .setImage(`https://api.alexflipnote.dev/scroll?text=` + args.join('%20'))
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
        message.channel.send(embed)
    }   
}