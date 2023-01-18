const Discord = require("discord.js");

function checkDays(date) {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const days = Math.floor(diff / 86400000);
	return `${days + (days == 1 ? " gün" : " gün")} önce`;
}
module.exports.run = async (client, message, args) => {
	const verifLevels = ["Yok", "Düşük", "Normal", "Yüksek", "Ebesinin Nikahı Hocam"];
	const region = {
		brazil: "Brazil",
		"eu-central": "Central Europe",
		singapore: "Singapore",
		"us-central": "U.S. Central",
		sydney: "Sydney",
		"us-east": "U.S. East",
		"us-south": "U.S. South",
		"us-west": "U.S. West",
		"eu-west": "Western Europe",
		"vip-us-east": "VIP U.S. East",
		london: "London",
		amsterdam: "Amsterdam",
		hongkong: "Hong Kong"
	};

	let emojis;
	if (message.guild.emojis.cache.size === 0) {
		emojis = "Yok";
	} else {
		emojis = message.guild.emojis.cache.size;
	}

	const embed = new Discord.MessageEmbed()
		.setAuthor(
			message.guild.name,
			message.guild.iconURL()
				? message.guild.iconURL()
				: client.user.displayAvatarURL()
		)
		.setThumbnail(message.guild.iconURL())
		.setDescription(
			`**Oluşturma Tarihi:** ${message.guild.createdAt
				.toString()
				.substr(0, 15)} (${checkDays(message.guild.createdAt)})\n**ID:** ${
				message.guild.id
			}\n**Sunucu Sahibi:** ${message.guild.owner.user.username}#${
				message.guild.owner.user.discriminator
			}\n**Sunucu Bölgesi:** ${region[message.guild.region]}\n**Takviyeler:** ${
				message.guild.premiumSubscriptionCount
			}\n**Kullanıcı Sayısı:** ${message.guild.memberCount}\n**Üye Sayısı:** ${
				message.guild.members.cache.filter(m => !m.user.bot).size
			}\n**BOT Sayısı:** ${
				message.guild.members.cache.filter(m => m.user.bot).size
			}\n**AFK Zaman Aşımı:** ${
				message.guild.afkTimeout / 60
			} dakika\n**Roller:** ${message.guild.roles.cache.size}\n**Kanallar:** ${
				message.guild.channels.cache.size
			}\n**Emojiler:** ${emojis}\n**Güvenlik Seviyesi:** ${
				message.guild.verificationLevel
			}`
		)

		// premiumSubscriptionCount
		.setColor(Math.floor(Math.random() * 16777215));
	message.channel.send({ embed });
};

module.exports.help = {
	name: "sunucubilgi",
	description: "Sunucunun bilgilerini gösterir.",
	usage: "!sunucubilgi",
	accessableby: "Member",
	aliases: ["sunucubilgi"]
};
