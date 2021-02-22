module.exports = {
    config: {
      name: "dm", 
      usage: "dm <user> <DM>",
      description: "DMs the mentioned user",
      category: "owner",
      accessableby: "owner",
      aliases: ["message"],
  },
    run: async (bot, message, args) => {

        if(message.author.id !== "398264990567628812") return message.channel.send("You don't have the permissions to user this")
    
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let dm = args.slice(1).join("")

        if(!user) return message.channel.send("Please specify a user to send the message to!")
        if(!dm) return message.channel.send("Please specify your message to the user")

        message.delete()

        user.send(dm).catch(err => console.log(err))
    }
 }