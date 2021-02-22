const { MessageEmbed } = require("discord.js");
const {red, green, purple_dark, purple_light, purple_medium,  black, blue_dark, white, red_dark, red_light, orange, pink, aqua, gold, green_dark, green_light, cream, cyan } = require("./colours.json");
const { success_emoji, error_emoji, loading } = require("./emojis.json")
const colours = [red, green, purple_dark, purple_light, purple_medium, black, blue_dark, white, red_dark, red_light, orange, pink, aqua, gold, green_dark, green_light, cream, cyan ];
const ranNum = Math.floor(Math.random() * colours.length);
const colour = colours[ranNum];


function BaseGeneratingEmbed(bot, message) {
    if(!client) console.log(`Client is a required param`);
    if(!message) console.log(`Message is a requried param`);

    return new MessageEmbed()
    .setTitle(`${loading} | Generating...`)
    // Description (IN command)
    .setTimestamp()
    .setThumbnail(message.guild ? message.guild.iconURL({dynamic: true}) : bot.user.displayAvatarURL({dynamic: true}))
    .setColor(gold)
    // Footer [IN COMMNAD]
}

module.exports = BaseGeneratingEmbed;