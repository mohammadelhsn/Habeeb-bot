const { inspect } = require("util");
const ownerid = "398264990567628812";
const botconfig = require("../../botconfig.json")

module.exports  = { 
    config: {
        name: "eval", // Command name here!   
        description: "Evaluates the code",
        accessableby: "Members",
        category: "owner",
        aliases: ["rep"], // Aliases here! 
        usage: `<input>`,
    },
    run:  async (bot, message, args) => {

    if(message.author.id === ownerid) {
        let toEval = args.join(" ");
        let evaluated = inspect(eval(toEval, { depth: 0} ))
        try {
            if(toEval) {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart)
                return message.channel.send(`✅ | Executed in ${hrDiff[0] > 0 ?` ${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms. *\`\`\`javascript\n${evaluated}\n\`\`\``, { maxlength: 1900})
            } else {
                message.channel.send("<:nah:695770802242715648> |  Error while evaluating: `cannot evaluated air`")
            }
        } catch(e) {
            message.channel.send(`<:nah:695770802242715648> |  Error while evaluating: \`${e.message}\``)
        }
    } else {
        return message.reply("<:nah:695770802242715648> |  You don't have the permissions to use this command").then(m => m.delete(10000))
             }

        }
}
