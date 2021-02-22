const { MessageEmbed } = require("discord.js");
const { green } = require("../../colours.json")

module.exports = {
    config: {
        name: "s", 
        description: "Allows bot to repeat the message you sent. If a channel is mentioned it will send it to that channel.", // Command description
        usage: "!s <message>  (channel)", 
        category: "moderation",
        accessableby: "Moderators", 
        aliases: ["say"] 
    },
run:  async (bot, message, args) => {

if(!message.member.hasPermission(["MANAGE_MESSAGES" ||  "ADMINISTRATOR"])) return message.channel.send("<:nah:695770802242715648> | You don't have the proper permissions to use this command!")
if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("<a:bruh:525820163044540417> | I don't have the permissionss to run this command for you")

let argresult;
let mChannel = message.mentions.channels.first()

message.delete()
if(mChannel) {
    argresult = args.slice(1).join(" ")
    mChannel.send(argresult)
} else {
    argresult = args.join(" ")
    message.channel.send(argresult)
        }   

        let embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Action-Logs`, message.guild.iconURL())
        .setColor(green)
        .addField("• Action:", "S command used", true)
        .addField("• Author:", message.author.username, true)
        .addField("• Date:", message.createdAt.toLocaleString(), true)
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

        bot.channels.cache.get('779814750716559431').send(embed);
    }
}
