const fs = require("fs")
const botconfig = require("../../botconfig.json")

module.exports = async (bot, message) => {

        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))

        if(!prefixes[message.guild.id]){
                prefixes[message.guild.id] = {
                        prefixes: botconfig.prefix
                }
        }

        let prefix = prefixes[message.guild.id].prefixes

        if(message.author.bot) return;
     
        let args = message.content.slice(prefix.length).trim().split(/ +/g)
        let command = args.shift().toLowerCase()

        if(!message.content.startsWith(prefix)) return
        let commandfile = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
        if(commandfile) commandfile.run(bot, message, args)
    
}