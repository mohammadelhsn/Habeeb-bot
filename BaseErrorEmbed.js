const { MessageEmbed } = require("discord.js");
const {red, green, purple_dark, purple_light, purple_medium,  black, blue_dark, white, red_dark, red_light, orange, pink, aqua, gold, green_dark, green_light, cream, cyan } = require("./colours.json");
const { success_emoji, error_emoji, loading } = require("./emojis.json")
const colours = [red, green, purple_dark, purple_light, purple_medium, black, blue_dark, white, red_dark, red_light, orange, pink, aqua, gold, green_dark, green_light, cream, cyan ];
const ranNum = Math.floor(Math.random() * colours.length);
const colour = colours[ranNum];

function BaseErrorEmbed(bot, message) {
    if(!client) console.log('Client is required')
    if(!message) console.log(`Message is a required param`)

    return new MessageEmbed()
    .setTitle(`${error_emoji} | Oops, an error has occured!`)
    // Description [FILL IN COMMAND]
    .setTimestamp()
    .setThumbnail(message.guild ? message.guild.iconURL({dynamic: true}) : bot.user.displayAvatarURL({dynamic: true}))
    .setColor(gold)
    // Footer [FILL IN COMMAND]
}

module.exports = BaseErrorEmbed;