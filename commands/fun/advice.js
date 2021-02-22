const request = require("superagent")
const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "advice",
        description: "Sends some daily life advice in a nice embed",
        usage: "",
        category: "fun",
        accessableby: "Members",
        aliases: ["advicepls", "lifeadvice"]
    },


    run: async (bot, message, args) => {
        request 
        .get('http://api.adviceslip.com/advice')
        .end((err, res) => {
            if (!err && res.status === 200) {
                try {
                    JSON.parse(res.text)
                } catch (e) {
                    return message.channel.send('An api error occurred.');
                }
                const advice = JSON.parse(res.text)
                let embed = new MessageEmbed()
                .setColor(cyan)
                .setAuthor(`${bot.user.username} ADVICE!`, message.guild.iconURL())
                .addField("Advice:", advice.slip.advice, true)
                .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())
                
                message.channel.send(embed)

            } else {
            console.error(`REST call failed: ${err}, status code: ${res.status}`)
            }
        })
    }
}