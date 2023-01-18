const Discord = require("discord.js");
const config = require("../../config/config.json");

module.exports.run = async (client, msg, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(`:x: İnsanları kickleme iznim yok!`)
		.setColor("RED");
	if (!msg.guild.member(client.user).hasPermission("KICK_MEMBERS"))
		return msg.channel.send(notice3).then(m => m.delete({ timeout: 5000 }));
	const kickusermentioned = msg.mentions.users.first();
	const kickTaged =
		kickusermentioned ||
		(args[0]
			? args[0].length == 18
				? msg.guild.members.cache.get(args[0]).user
				: false
			: false);
	let reason = args.slice(1).join(" ");
	const embed6 = new Discord.MessageEmbed()
		.setDescription(
			`:x: ${msg.author.username}, Eksik İzin!`
		)
		.setColor("RED");
	if (!msg.member.hasPermission("KICK_MEMBERS"))
		return msg.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	const mmqembed = new Discord.MessageEmbed()
		.setTitle("Komut: !kick")
		.setDescription("Kullanım: !kick @kullanıcı sebep")
		.setColor("RED");
	if (!kickTaged) {
		return msg.channel.send(mmqembed).then(m => m.delete({ timeout: 5000 }));
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
	const notice2 = new Discord.MessageEmbed()
		.setDescription(`:x: Kendini sunucudan atamazsın!`)
		.setColor("RED");
	if (msg.author.id === kickTaged.id) return msg.channel.send(notice2);
	const botRolePossition = msg.guild.member(client.user).roles.highest.position;
	const rolePosition = msg.guild.member(kickTaged).roles.highest.position;
	const userRolePossition = msg.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return msg.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition) return msg.channel.send(sdfsdfsdfsd);

	const sdfdfsdfsdfdfs = new Discord.MessageEmbed()
		.setDescription(
			`:x: Kullanıcıyı sunucudan atmaya çalışırken hata oluştu!`
		)
		.setColor("RED");

	if (!msg.guild.member(kickTaged).kickable) {
		return msg.channel.send(sdfdfsdfsdfdfs);
	}

	if (reason.length < 1) reason = "Sebep girilmedi.";

	const kickEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setTitle("Sunucudan Atma")
		.addField("Hedef", `**<@${kickTaged.id}> **`)
		.addField("Atan Kişi", `<@${msg.author.id}>`)
		.addField("Sebep", `\`\`\`${reason}\`\`\``)
		.setTimestamp();

	const suembed = new Discord.MessageEmbed()
		.setDescription(
			`✅
 **${kickTaged.username}#${kickTaged.discriminator}** Sunucudan Atıldı | Sebep: **${reason}**`
		)
		.setColor("GREEN");

	msg.delete();
	msg.channel.send(suembed);
	msg.guild.member(kickTaged).kick(reason);
const bandm = new Discord.MessageEmbed()
		.setDescription(
			`🔨 Bir Sunucudan Atıldın!`)
.addField("Atıldığın Sunucu:", `${msg.guild.name}`)
.addField("Atılma Sebebi:", `${reason}`)
.setColor("RED")
.setThumbnail("https://cdn.discordapp.com/attachments/952302224871129161/953034150183579678/kisspng-emoji-discord-smiley-shrug-clip-art-kick-vac-banned-user-mods-5be28700c98a93.3153631415415723528255.png")
.setFooter("BOT yefeblgN | Moderasyon Sistemi")

	kickTaged.send(bandm);
};

module.exports.help = {
	name: "kick",
	description:
		"This command is used for kicking people u hates or againsting your server rules.",
	usage: "d!kick <mentions> <reason>",
	accessableby: "Kick Members",
	aliases: ["kick", "sunucudanat"]
};
