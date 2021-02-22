const discord = require("discord.js");

module.exports = {
	config: {
		name: "ping",
		description: "Sends the ping",
		usage: "",
		category: "bot utilities",
		accessableby: "Members",
		aliases: ["latency"],
	},

	run: async (bot, message, args) => {
		// Pinging

		message.channel.send("Pinging...").then((m) => {
			// Defining (ping, choices and response) which will later be used in the final message

			let ping = m.createdTimestamp - message.createdTimestamp;

			/* Edit the message with the ping for ex:
Final output example:  Is this really my ping?: Bot latency 80, API latency 180
*/
			console.log(bot.ping);

			m.edit(
				`Bot Latency: \`${ping}\`\nAPI Latency \`${Math.round(bot.ws.ping)}\``
			);
		});
	},
};
