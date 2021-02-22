const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json")
const fs = require("fs")
const botconfig = require("../../botconfig")


module.exports = {
    config: { 
        name: "support",
        description: "Sends you an invite to the support server!",
        usage: "",
        category: "bot utilities",
        accessableby: "all",
        aliases: ["",]
    },
    run: async (bot, message, args) =>  {

        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))

        if(!prefixes[message.guild.id]){
                prefixes[message.guild.id] = {
                        prefixes: botconfig.prefix
                }
        }

        let prefix = prefixes[message.guild.id].prefixes
        
        let embed = new MessageEmbed()
        .setTitle(`${bot.user.username} support`)
        .setColor(cyan)
        .addField("Command list:", `do ${prefix}help to get the command list, if you need help with specific commands, do ${prefix}help command name`, true)
        .setURL("https://discord.gg/P3w26jT")
        message.channel.send(embed)
    }
}