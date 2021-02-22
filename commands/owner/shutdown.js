module.exports = {
    config: {
        name: "shutdown",
        description: "Shuts the bot down",
        usage: "",
        category: "owner",
        accessableby: "Bot owner",
        aliases: ["botstop"],
    }, 
    run: async (bot, message, args) => {
        // Checks if the author of the message is the owner
        if(message.author.id != "398264990567628812") return message.channel.send("<:nah:695770802242715648> |  Nice try, but you're not the bot owner!")
            // Shuts down the bot
        try {
            await message.channel.send("✅ | ***Bot is shutting down...***")
            process.exit()
                // If there is an error, it will send the error to the channel.
        } catch(e) {
            message.channel.send(`<:nah:695770802242715648> | ERROR: ${e.message}`)
        }
    }
}