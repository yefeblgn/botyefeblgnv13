const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const config = require("../../config/config.json");

module.exports.run = async (client, message) => {
	const milliseconds = parseInt((client.uptime % 1000) / 100);
	let seconds = parseInt((client.uptime / 1000) % 60);
	let minutes = parseInt((client.uptime / (1000 * 60)) % 60);
	let hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
	let days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
	days = days < 10 ? `0${days}` : days;
	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	seconds = seconds < 10 ? `0${seconds}` : seconds;
	// var totcmds = files.length;

	fetch(
		"https://api.hetrixtools.com/v1/f10ac71364c8b1aa149b4079fe8eafc9/uptime/report/483cfd9cb2dd306bf8c00917da1df827/"
	)
		.then(response => response.json())
		.then(data => {

			const embed = new Discord.MessageEmbed()
				.setColor(0x7289da)
				.setTimestamp()
				// .addField("Prefix", 'd!', true)
				// .addField("Total Commands", `${totcmds} commands`, true)
				.addField("Toplam Sunucu", `${client.guilds.cache.size}`, true)
				.addField("Ping", `${Math.round(client.ws.ping)}ms`, true)
				.addField(
					"Çalışma Süresi",
					`${days}d ${hours}h ${minutes}m ${seconds}.${milliseconds}s`,
					true
				)
				.setFooter(
					"BOT yefeblgN",
					"https://cdn.discordapp.com/avatars/825121776198877264/3f24d6b21a1864111af2c3c9c0c4a1af.png?size=4096"
				);
			return message.channel.send({ embed });
		});
};
module.exports.help = {
	name: "stats",
	description: "This command is used for monitoring stats of bot.",
	usage: "d!stats",
	accessableby: "Member",
	aliases: ["botistatistik"]
};
