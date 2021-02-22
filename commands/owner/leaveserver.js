const { ownerid } = require("../../botconfig.json")

module.exports = {
    config: {
        name: "leaveserver",
        description: "makes the bot leave the current server",
        usage: "",
        category: "owner",
        accessableby: "Owner",
        aliases: [""],
    },
    run: async (bot, message, args) => {
        if(message.author.id !== ownerid) return message.channel.send("<:nah:695770802242715648> | Nice try, that doesn't work for you tho.")
        let id = args[0]
        if(!id) id = message.guild.id;
        return message.guild.leave(id)
    }
}