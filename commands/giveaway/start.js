const ms = require("ms")
const giveawaysManager = require("../../events/guild/discord-giveaways")

module.exports = {
    config: {
        name: "start",
        description: "starts a giveaway",
        usage: "",
        accessableby: "admins",
        aliases: ["start-giveaway"],
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(['MANAGE_MESSAGES', "ADMINISTRATOR"])) return message.channel.send("You don't have the permissions to use this command :cry:")

        let giveawayChannel = message.mentions.channels.first() 
        let duration = args[1]
        let numberOfWinners = args[2]
        let giveawayPrize = args.slice(3).join(' ')

        if(!giveawayChannel) return message.channel.send("Please specify the channel where you want to start the giveaway.")
        if(!duration || isNaN(ms(duration))){
            return message.channel.send("Please specify a valid amount of time")
        }
        if(isNaN(numberOfWinners)){
            return message.channel.send(':x: You have to specify a valid number of winners!');
        }
        if(!giveawayPrize) return message.channel.send("Please specify the prize!")


        bot.giveawaysManager.start(giveawayChannel, {
            time: ms(duration),
            prize: giveawayPrize,
            winnerCount: numberOfWinners,
            hostedBy: message.author.username,
                messages: {
                    giveaway: "🎉🎉 GIVEAWAY 🎉🎉",
                    giveawayEnded: "🎉🎉 GIVEAWAY ENDED 🎉🎉",
                    timeRemaining: "Time remaining: \` {duration}\`",
                    inviteToParticipate: "React with 🎉 to participate!",
                    winMessage: "Congrats, {winners}! You won \`{prize}\`",
                    embedFooter: "Giveaways",
                    noWinner: "Giveaway cancelled, there are no reactions.",
                    hostedBy: "Hosted by {user}",
                    winners: "winner(s)",
                    endedAt: "Ended at",
                    units: {
                        seconds: "seconds",
                        minutes: "minutes",
                        hours: "hours",
                        days: "days",
                        pluralS: false 
                    }


                }
        })

        message.channel.send(`Giveaway for ${giveawayPrize} has started in ${giveawayChannel} by ${message.author.username} for ${duration}`)
    }
}