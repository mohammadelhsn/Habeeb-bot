const { prefix } = require("../../botconfig.json")

module.exports = async bot => {
    console.log(`✅ | ${bot.user.username}#${bot.user.discriminator} has logged in`)
    let statuses = [ 
        `${bot.guilds.cache.size} server(s)!`,
        ` for ${prefix}help`,
        `Over ${bot.users.cache.size} user(s)!`, 
        "the chat for commands!",
    ]

setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, {type: "WATCHING"});
    }, 10000)
}
