const { MessageEmbed } = require("discord.js");
var randomColour = '#'+Math.floor(Math.random()* 16777215).toString(16)


module.exports = {
    config: {
        name: "roleinfo",
        aliases: ["ri"],
        usage: `<role name>`,
        category: "server utilities",
        description: "Displays information on a role within the guild",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

        // Check for a mentioned role, otherwise return a message.
       let role =  message.guild.roles.cache.find(r => r.name === args[1]) || message.guild.roles.cache.find(r => r.id === args[1]) || message.mentions.roles.first()
        if (!role) return message.channel.send("<:nah:695770802242715648> | Sorry! I couldn't find that role.")
       
        let roleinfo = {}
        
        roleinfo.colour = role.hexColor
        roleinfo.createdAt = role.createdAt
        roleinfo.deleted = roleinfo.deleted ? "Yes" : "No"
        roleinfo.editable = role.editable ? "Yes" : "No"
        roleinfo.createdTimestamp = role.createdTimestamp
        roleinfo.guild = role.guild
        roleinfo.id = role.id // used
        roleinfo.managed = role.managed ? "Yes" : "No"
        roleinfo.name = role.name // used 
        roleinfo.mentionable = role.mentionable ? "Yes" : "No"

        let embed = new MessageEmbed() 
        .setAuthor(`${message.guild.name} Channel Info`)
        .setColor(randomColour)
        .addField("• Role name:", roleinfo.name, true)
        .addField("• Role id:", roleinfo.id, true)
        .addField("• Role guild", roleinfo.guild, true)
        .addField("• Role colour", roleinfo.colour, true)
        .addField("• Role mentionable?", roleinfo.mentionable, true)
        .addField("• Role Deleted?", roleinfo.deleted, true)
        .addField("• Role editable?", roleinfo.editable, true)
        .addField("• Role managed by external source?", roleinfo.managed, true)
        .addField("• Created at:", roleinfo.createdAt, true)
        .addField("• Created Timestamp", roleinfo.createdTimestamp, true)
        message.channel.send(embed)
    }
}