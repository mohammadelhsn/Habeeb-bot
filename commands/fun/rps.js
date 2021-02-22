module.exports = {
    config: {
        name: "rps",
        description: "Rock, paper, scissors", 
        usage: "<input>",
        category: "fun",
        aliases: [""],
    },
    run: async (bot, message, args ) => {
        let rps = ["**:moyai: rock**", "**:pencil: paper**", "**:scissors: scissors**"]
        function random() { return `${rps[Math.floor(Math.random() * rps.length)]}!`}
        let choice = args.join(" ").toLowerCase()
        if(!choice) return message.channel.send("Please specify your choice")
        if(choice !== "rock" && choice !== "paper" && choice !== "scissors") return message.channel.send("Rock, paper or scissors")
        message.channel.send(random())
    }
}