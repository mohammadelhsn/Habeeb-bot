const { MessageEmbed } = require("discord.js");
const { red } = require("../../colours.json");
const BaseErrorEmbed = require("../../BaseErrorEmbed");

module.exports = {
	config: {
		name: "clear",
		description: "Clears the mentioned amount of messages",
		usage: "<number of messages> <log channel>",
		accessableby: "Moderators",
		category: "moderation",
		aliases: ["purge", "delete"],
	},
	run: async (bot, message, args) => {
		if (!message.member.hasPermission(["MANAGE_MESSAGES" || "ADMINISTRATOR"]))
			return message.channel.send(
				"<a:bruh:525820163044540417> | You don't have the perms to use this command."
			);
		if (!message.guild.me.hasPermission(["MANAGE_MESSAGES" || "ADMINISTRATOR"]))
			return message.channel.send(
				"<a:bruh:525820163044540417> | I don't have the permissions to run the command."
			);

		if (!args[0])
			return message.channel.send(
				"<:nah:695770802242715648> | Please specify the amount of messages you want to delete"
			);
		let logChannel = message.mentions.channels.first();
		if (!logChannel)
			return message.channel.send(
				"<:nah:695770802242715648> | Please specify the channel you want to log this event in!"
			);
		try {
			message.channel.bulkDelete(args[0]).then(() => {
				message.channel
					.send(
						`<:yeppp:695770802838175834> |  Cleared **${args[0]}** messages.`
					)
					.then((msg) => msg.delete(5000));
			});
		} catch (e) {
			console.log(e);

			const errorEmbed = BaseErrorEmbed(bot, message).setDescription(
				"```Error details: An unexpected error has occurred```"
			);
			message.channel.send(errorEmbed);
		}
		let embed = new MessageEmbed()
			.setAuthor(`${message.guild.name} Action-Logs`, message.guild.iconURL())
			.setColor(red)
			.addField("• Action:", "Purge command used", true)
			.addField("• Author:", message.author.username, true)
			.addField("• Number of messages purged", `${args[0]}`, true)
			.addField("• Date:", message.createdAt.toLocaleString(), true)
			.setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL());
		bot.channels.cache.get("779814750716559431").send(embed);
	},
};
