const { MessageEmbed } = require("discord.js");
const {red, green, purple_dark, purple_light, purple_medium,  black, blue_dark, white, red_dark, red_light, orange, pink, aqua, gold, green_dark, green_light, cream, cyan } = require("./colours.json");
const { success_emoji, error_emoji, loading } = require("./emojis.json")
const colours = [red, green, purple_dark, purple_light, purple_medium, black, blue_dark, white, red_dark, red_light, orange, pink, aqua, gold, green_dark, green_light, cream, cyan ];
const ranNum = Math.floor(Math.random() * colours.length);
const colour = colours[ranNum];

function BaseEmbed(bot, message) {
    
    if(!message) console.log('Message is required')
    if(!bot) console.log('Client is required')
  
    return new MessageEmbed()
    // Title [FILL IN COMMAND]
    // Description [FILL IN COMMAND]
      .setTimestamp()
      .setThumbnail(message.guild ? message.guild.iconURL({dynamic: true}) : bot.user.displayAvatarURL({dynamic: true}))
      .setColor(gold)
    // Footer [FILL IN COMMAND]
  }

module.exports = BaseEmbed;