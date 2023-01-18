const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
	const trufal = {
		true: "Robot",
		false: "İnsan"
	};

	// let user;

	const usernotfind = new Discord.MessageEmbed()
		.setDescription(`:x: Kullanıcı bulunamadı!`)
		.setColor("RED");

	const rankuser = message.mentions.users.first();
	let user;
	try {
		user =
			rankuser ||
			(message.mentions.users.first()
				? message.mentions.users.first()
				: args[0]
				? args[0].length == 18
					? message.guild.members.cache.get(args[0]).user
					: message.guild.members.cache.find(
							r =>
								r.user.username.toLowerCase() ===
								args.join(" ").toLocaleLowerCase()
					  ).user
				: message.author);
	} catch (e) {
		return message.channel.send(usernotfind);
	}

	let userguild = message.guild.member(user);
	const member = message.guild.member(user);
	const roles = member.roles.cache.map(r => `${r}`).join(", ");
	const serveddrembed = new Discord.MessageEmbed()
		.setDescription("🛠️ Kullanıcı bilgilerine erişiliyor...")
		.setColor("RED");

	message.channel.send(serveddrembed).then(async message => {
		const embed = new Discord.MessageEmbed()
			.setColor(user.displayHexColor)
			.setAuthor(
				`${user.tag} Kullanıcısının Bilgileri`,
				user.displayAvatarURL({ dynamic: false, format: "png", size: 4096 })
			)
			.setDescription(
				`**İsmi: **${user.tag}\n**ID: **${
					user.id
				}\n**Durumu: **${user.presence.status.toUpperCase()}\n**• Oynadığı Oyun: **${
					user.presence.game
						? user.presence.game.name
						: "Şu anda Hiç Bir Şey Oynamıyor!"
				}\n**Hesap Türü: **${trufal[user.bot]}\n**Sunucuya Katılma Tarihi: **${moment(
					userguild.joinedAt
				).format("DD-MM-YYYY")}\n**Hesap Oluşturulma Tarihi: ** ${moment(
					user.createdAt
				).format(
					"DD-MM-YYYY"
				)}\n**Avatar**: [Buraya Tıkla](${user.displayAvatarURL({
					dynamic: false,
					format: "png",
					size: 4096
				})})\n**Rolleri: **${roles}`
			)

			.setThumbnail(
				`${user.displayAvatarURL({
					dynamic: false,
					format: "png",
					size: 4096
				})}`
			)
			.setTimestamp();

		await message.edit(embed);
	});
};

module.exports.help = {
	name: "whois",
	description: "Check who is him/her",
	usage: "d!whois <mention or keep blank>",
	accessableby: "Members",
	aliases: ["kullanıcıbilgi"]
};
