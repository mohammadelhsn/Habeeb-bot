const { MessageEmbed } = require("discord.js");
var randomColour = '#'+Math.floor(Math.random()* 16777215).toString(16)

module.exports ={
    config: {
        name: "membercount",
        description: "Sends the membercount of the sevrer! ",
        usage: "",
        category: "server utilities",
        accessableby: "Members",
        aliases: ["mb"] // Aliases here! 
    },

    run:  async (bot, message, args) => {


    // Create the mebed to show the membercount and the status of the members of the server!


    let embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Member count`, message.guild.iconURL())
        .setColor(randomColour)
        .setThumbnail(message.guild.iconURL())
        .addField('Members', `**${message.guild.memberCount}**`, true) 
        .addField('• Humans', `**${message.guild.members.cache.filter(member => !member.user.bot).size}**`, true)
        .addField('• Bots', `**${message.guild.members.cache.filter(member => member.user.bot).size}**`, true)
        .addField('• Member Status', `**${message.guild.members.cache.filter(o => o.presence.status === 'online').size}** Online\n**${message.guild.members.cache.filter(i => i.presence.status === 'idle').size}** Idle/Away\n**${message.guild.members.cache.filter(dnd => dnd.presence.status === 'dnd').size}** Do Not Disturb\n**${message.guild.members.cache.filter(off => off.presence.status === 'offline').size}** Offline/Invisible\n**${message.guild.members.cache.filter(s => s.presence.status === 'streaming').size}** Streaming`, true)
        .setFooter(`• Owner: ${message.guild.owner.user.tag}`)

// Sends the embed to the current channel


    message.channel.send(embed);
    }
}
