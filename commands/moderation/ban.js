const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../config/config.json");

module.exports.run = async (client, msg, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(`:x: Hop yavaş ol <@${msg.author.id}>! Milleti banlamaya yetkin yok.`)
		.setColor("RED");
	if (!msg.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
		return msg.channel.send(notice3).then(msg => msg.delete({ timeout: 5000 }));
	}

	const banusermentioned = msg.mentions.users.first();
	const banTaged =
		banusermentioned ||
		(args[0]
			? args[0].length == 18
				? msg.guild.members.cache.get(args[0]).user
				: false
			: false);

	// const banTaged = msg.mentions.users.first();
	let reason = args.slice(1).join(" ");

	const mmqembed = new Discord.MessageEmbed()
		.setDescription(
			`:no_entry_sign: <@${msg.author.id}>, Eksik İzin`
		)
		.setColor("#FFFF00");
	if (!msg.member.hasPermission("BAN_MEMBERS")) {
		return msg.channel
			.send(mmqembed)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	const kntlembed = new Discord.MessageEmbed()
		.setTitle("Komut: !ban")
		.setDescription(
			"Yanlış Kullanım! \n\n**Kullanımı:** !ban [Kullanıcı] [Sebep]"
		)
		.setColor("RED");
	if (!banTaged) {
		return msg.channel
			.send(kntlembed)
			.then(msg => msg.delete({ timeout: 10000 }));
	}
	const notice2 = new Discord.MessageEmbed()
		.setDescription(`:x: Kendini banlayamazsın!`)
		.setColor("RED");

	if (banTaged.id === msg.author.id) {
		return msg.channel
			.send(notice2)
			.then(msg => msg.delete({ timeout: 10000 }));
	}

	const dsfdsfsdf = new Discord.MessageEmbed()
		.setDescription(
			`:x: Banlamaya çalıştığın kişinin rolü senin rolünden yüksek!`
		)
		.setColor("RED");
	const sdfsdfsdfsd = new Discord.MessageEmbed()
		.setDescription(
			`:x: Banlamaya çalıştığın kişinin rolü benim rolündem yüksek!`
		)
		.setColor("RED");
	const botRolePossition = msg.guild.member(client.user).roles.highest.position;
	const rolePosition = msg.guild.member(banTaged).roles.highest.position;
	const userRolePossition = msg.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return msg.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition) return msg.channel.send(sdfsdfsdfsd);

	const sdfdfsdfsdfdfs = new Discord.MessageEmbed()
		.setDescription(
			`:x: Bu üye yasaklanırken bir hata oluştu!`
		)
		.setColor("RED");

	if (reason.length < 1) reason = "Sebep belirtilmedi.";

	if (!msg.guild.member(banTaged).bannable) {
		return msg.channel.send(sdfdfsdfsdfdfs);
	}

	const banEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setAuthor("Yasaklama")
		.addField("Hedef", `<@${banTaged.id}>`)
		.addField("Yasaklayan", `**<@${msg.author.id}>**`)
		.addField("Sebep", `\`\`\`${reason}\`\`\``)
		.setTimestamp()
		.setFooter("BOT yefeblgN | Moderasyon Sistemi"); //
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`✅ **${banTaged.username}#${banTaged.discriminator}** Sunucudan Yasaklandı | Sebep: **${reason}**`
		)
		.setColor("GREEN");

	msg.delete();
	msg.channel.send(bsuembed);
	msg.guild.members.ban(banTaged.id, { reason });
const bandm = new Discord.MessageEmbed()
		.setDescription(
			`🔨 Bir Sunucudan Yasaklandın!`)
.addField("Yasaklandığın Sunucu:", `${msg.guild.name}`)
.addField("Yasaklanma Sebebi:", `${reason}`)
.setColor("RED")
.setThumbnail("https://cdn.discordapp.com/attachments/835551694179663872/953030098628526170/181-1810865_banthonking-discord-emoji-ban-hammer-emoji-discord-hd-removebg-preview.png")
.setFooter("BOT yefeblgN | Moderasyon Sistemi")
	banTaged.send(bandm);
};

module.exports.help = {
	name: "ban",
	description: "This command is used for banning the members you dont like.",
	usage: "d!ban <mentions> <reason>(optional)",
	accessableby: "Ban Members",
	aliases: ["ban", "yasakla"]
};
