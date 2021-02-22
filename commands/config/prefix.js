const fs = require("fs")
const BaseErrorEmbed = require("../../BaseErrorEmbed");
const BaseEmbed = require("../../BaseEmbed");
const BaseSuccessEmbed = require("../../BaseSuccessEmbed");


module.exports = {
    config: {
        name: "prefix",
        description: "Changes the prefix for the server",
        usage: "<new prefix>",
        category: "config",
        accessableby: "Admins",
        aliases: [""],
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(["MANAGE_SERVER", "ADMINISTRATOR"]))  {
            const errorEmbed = BaseErrorEmbed(bot, message)
            .setDescription(`\`\`\`Error details: You don't have the appropriate permissions\`\`\``)
            .setFooter(`Prefix command | ${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
            return message.channel.send(errorEmbed);
        }
        if(!args[0] || args[0] === "help") {
            const errorEmbed = BaseErrorEmbed(bot, message) 
            .setDescription(`\`\`\`Error details: You are missing the correct arguments\`\`\``)
            .setFooter(`Prefix command | ${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
            return message.channel.send(errorEmbed);
        }

        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))

        prefixes[message.guild.id] = {
            prefixes: args[0]
        }

        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err)

            message.channel.send(`The new prefix is \`${args[0]}\`. `)
        } )
    }
}