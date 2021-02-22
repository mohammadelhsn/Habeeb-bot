const { MessageEmbed } = require("discord.js");
var randomColour = '#'+Math.floor(Math.random()* 16777215).toString(16)
const moment = require("moment")

    module.exports = { 
        config: {
            name: "userinfo",
            description: "Pulls the info of the mentioned user or youself!",
            usage: "(user)",
            category: "server utilities",
            accessableby: "Members",
            aliases: ["whois"]
        },
        run: async (bot, message, args) => {

            const user = message.mentions.users.first() || message.author || args[0]

                let userinfo = {};
                userinfo.bot = user.bot 
                userinfo.avatar = user.displayAvatarURL() 
                userinfo.name = user.username 
                userinfo.discrim = `#${user.discriminator}`  
                userinfo.id = user.id 
                userinfo.status = user.presence.status 
                userinfo.registered =  moment.utc(message.guild.members.cache.get(user.id).user.createdAt).format("dddd, MMMM Do, YYYY") 
                userinfo.joined = moment.utc(message.guild.members.cache.get(user.id).joinedAt).format("dddd, MMMM Do, YYYY") 
                userinfo.bannable = `${message.member.bannable ? "Yes" : "No"}` 
                userinfo.kickable = `${message.member.kickable ? "Yes" : "No"}` 
                userinfo.deleted = `${message.member.deleted ? "Yes" : "No"}`
                userinfo.nickname = `${message.member.nickname ? message.member.nickname : user.username}`
                userinfo.premiumSince = `${message.member.premiumSince ? message.member.premiumSince : "Never"}`
                userinfo.game =  `${user.presence.game ? user.presence.game.name : 'None'}` 
                userinfo.roles = `${message.member.roles.cache.map(r => `${r}`).join(' | ')}`
// .map(r => `${r}`).join(' | ')}`


            const embed =  new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL()) 
            .setColor(randomColour) 
            .addField("• User is Bot?", userinfo.bot, true )
            .addField("• User username:", userinfo.name , true)
            .addField("• User discriminator", userinfo.discrim , true)
            .addField("• User ID:", userinfo.id , true)
            .addField("• User status", userinfo.status , true)
            .addField("• User date registered:", userinfo.registered , true)
            .addField("• User date joined:", userinfo.joined , true)
            .addField("• User bannable?", userinfo.bannable , true)
            .addField("• User kickable?", userinfo.kickable , true)
            .addField("• User deleted", userinfo.deleted, true)
            .addField("• User guild", userinfo.guild, true)
            .addField("• User nickname", userinfo.nickname, true)
            .addField("• User premium since", userinfo.premiumSince, true)
            .addField("• Game:", userinfo.game , true)
            .addField("Roles:", `${userinfo.roles}`, true)
            .setThumbnail(user.displayAvatarURL())
            message.channel.send(embed)
        }
    }
