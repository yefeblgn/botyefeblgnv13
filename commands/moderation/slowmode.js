const Discord = require("discord.js");

exports.run = (client, message, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			`:x: Bu kanalda yavaş mod ayarlanamadı, yavaş mod süresini kontrol edin!`
		)
		.setColor("RED");

	const notice1 = new Discord.MessageEmbed()
		.setDescription(
			`:x: Bu kanalda yavaş mod ayarlanamadı, lütfen geçerli bir süre girin!`
		)
		.setColor("RED");

	const noticwsse1 = new Discord.MessageEmbed()
		.setDescription(
			`:x: Bu kanalda yavaş mod ayarlanamadı, sadece 0 - 21600 arası saniye yazabilirsiniz!`
		)
		.setColor("RED");

	const notice22 = new Discord.MessageEmbed()
		.setDescription(
			`:x: Kanal yavaş modunu değiştirme iznim yok!`
		)
		.setColor("RED");

	if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	const duration = parseInt(args[0]);
	const mmsssqembed = new Discord.MessageEmbed()
		.setDescription(
			`:x: ${message.author.username}, İznin Yok.`
		)
		.setColor("#FFFF00");
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(mmsssqembed)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	if (isNaN(duration)) {
		return message.channel.send(notice1);
	}
	if (duration < 0 || duration > 21601) {
		return message.channel.send(noticwsse1);
	}
	message.channel.setRateLimitPerUser(duration).catch(() => {
		message.channel.send(notice3);
	});
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`✅ Yavaş Mod Ayarlandı. Geçerli Süre: **${duration}s** `
		)
		.setColor("GREEN");

	message.channel.send(bsuembed);
};

module.exports.help = {
	name: "slowmode",
	description:
		"This command is used for changing the slowmode as settings page cannot.",
	usage: "d!slowmode <1-21600>",
	accessableby: "Manage Channels",
	aliases: ["yavaşmod"]
};
