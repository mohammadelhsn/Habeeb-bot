const ms = require("ms");

module.exports = {
	config: {
		name: "remindme",
		description: "Reminds the user of something in the speciied time",
		usage: "<time> <reminder>",
		category: "server utilities",
		accessableby: "Members",
		aliases: ["remind", "tellme"],
	},
	run: async (bot, message, args) => {
		// Defininig a few things

		let time = args[0];
		let reminder = args.slice(1).join(" ");

		// If certain things don't exist

		if (!reminder)
			return message.channel.send(
				"<:nah:695770802242715648> |  Please specify a Reminder!"
			);
		if (time <= 0) {
			return message.channel.send(
				"<:nah:695770802242715648> | Please enter a time period followed by **s** **m** or **h**"
			);
		}

		message.channel.send(
			`Your reminder for ${ms(ms(time), {
				long: true,
			})} has started! See you in a bit!`
		);

		// Set timeout function ===

		setTimeout(function () {
			message.channel.send(
				`<@${message.author.id}> It's been ${ms(ms(time), {
					long: true,
				})}: Here is your reminder!: ${reminder} `
			);
		}, ms(time));
	},
};
