const ms = require("ms")

module.exports = {
    config: {
        name: "timer",
        description: "sets a timer",
        usage: "<input>",
        category: "server utilities",
        accessibleby: "Members",
        aliases: [""],
    },

    run: async (bot, message, args) => {
        let Timer = args[0]

        if(!Timer) return message.channel.send("<:nah:695770802242715648> | Please give a valid amount of time followed by **s**, **m** or **h** ")

        if(args[0] <= 0) {
            return message.channel.send("<:nah:695770802242715648> | Please enter a time period followed by \`s\` \`m\` or \`h\`")
            }

        message.channel.send(`Your timer for \`${ms(ms(Timer), {long: true})}\` has started! See you in a bit!`)
            setTimeout(function(){
                message.channel.send(message.author.toString() + ` The Timer Has FINISHED!, it lasted: \`${ms(ms(Timer), {long: true})}\``)
                }, ms(Timer));
    }
}