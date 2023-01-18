const Discord = require("discord.js");
const fs = require("fs");
const settings = require("../../config/settings.json");

module.exports.run = async (client, message, args) => {
	const embedmissingperms = new Discord.MessageEmbed()
		.setDescription(
			`:warning: ${message.author.username}, Bu komutu kullanmaya iznin yok!`
		)
		.setColor("RED");

	const embedmissing = new Discord.MessageEmbed()
		.setDescription(`🛠️ Lütfen ayarlamak istediğiniz prefixi yazın!`)
		.setColor("RED");

	const embedtoolong = new Discord.MessageEmbed()
		.setDescription(
			`🛠️ Prefixin uzunluğu 3 harften uzun olmamalıdır`
		)
		.setColor("RED");
	const embedsame = new Discord.MessageEmbed()
		.setDescription(`🛠️ Ayarladığın prefix mevcut prefix ile aynı!`)
		.setColor("RED");

	if (!message.member.hasPermission("MANAGE_SERVER"))
		return message.channel.send(embedmissingperms);

	await client.settings.ensure(message.guild.id, settings);

	if (!args[0]) return message.channel.send(embedmissing);

	if (args[0].length > 3) return message.channel.send(embedtoolong);
	if (args[0] == client.settings.get(message.guild.id, "prefix"))
		return message.channel.send(embedsame);

	// We can confirm everything's done to the client.

	const warningsembed = new Discord.MessageEmbed()
		.setDescription(
			`${
				emojis.warning
			} Varsayılan prefixi değiştirdiğinizde, geçerli prefix \`${client.settings.get(
				message.guild.id,
				"prefix"
			)}\` artık çalışmayacak ve girdiğiniz yeni prefix ile değiştirilecek.\n\nİşleminizi onaylamak için lütfen \`onayla\` yazın!`
		)
		.setColor("RED");

	const calcelembed = new Discord.MessageEmbed()
		.setDescription(
			`:x: Süre doldu! Prefix değişim işlemi iptal edildi!`
		)
		.setColor("RED");

	message.channel.send(warningsembed);
	await message.channel
		.awaitMessages(
			m => m.author.id === message.author.id && m.content === "onayla",
			{
				max: 1,
				time: 20000,
				errors: ["time"]
			}
		)
		.then(async collected => {
			await client.settings.set(message.guild.id, args[0], "prefix");
			message.delete();
			const doneembed = new Discord.MessageEmbed()
				.setDescription(
					`✅ Prefix değiştirildi. Yeni Prefix: \`${client.settings.get(
						message.guild.id,
						"prefix"
					)}\``
				)
				.setColor("GREEN");
			message.channel.send(doneembed);
		})
		.catch(collected => message.channel.send(calcelembed));
};

module.exports.help = {
	name: "prefixayarla",
	description: "Bu komut prefixi değiştirmek için kullanılır..",
	usage: "!prefixayarla <yeniprefix>",
	accessableby: "Manage Server",
	aliases: ["prefixayarla"]
};
