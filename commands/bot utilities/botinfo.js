
const { gold } = require("../../colours.json")
const discord = require("discord.js")
const { ownerid, version } = require("../../botconfig.json")


module.exports = {
    config: {
        name: "botinfo",
        description: "displays the bots information",
        category: "bot utilities",
        usage: "",
        accessableby: "all",
        aliases: [""],
    },
    run: async (bot, message, args) => {

// To get the version of node, you do process.version

    const nodeversion = process.version

// Getting the discord version is discord.version
    
    const discordVersion = discord.version

/*
When calling on Discord and Embed or just calling on different parts of discord just do const discord = require("discord.js")
then go back to old old coding let embed = new discord.MessageEmbed()
}
*/

    const embed = new discord.MessageEmbed()
    .setColor(gold)
    .addField("Serers",`I am watching ${bot.guilds.cache.size} server(s)!`, true)
    .addField("Users:", `I am watching ${bot.users.cache.size} member(s)!`, true)
    .addField("Discord.js version", discordVersion, true)
    .addField("Node.js version", nodeversion, true)
    return message.channel.send(embed);

    }
}