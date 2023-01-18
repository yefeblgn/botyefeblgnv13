const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	const bbb = new Discord.MessageEmbed().setDescription(
		`Mesaj Gecikmesi: **${
			Date.now() - message.createdTimestamp
		}ms**\nDiscord API Gecikmesi: **${Math.round(client.ws.ping)}ms**`
	);
	message.channel.send(bbb);
};

module.exports.help = {
	name: "ping",
	description: "Botun pingini ölçer.",
	usage: "!ping",
	accessableby: "Members",
	aliases: ["ping"]
};
