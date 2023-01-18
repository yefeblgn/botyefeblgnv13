const Discord = require("discord.js");
const config = require("../../config/config.json");
const settings = require("../../config/settings.json");

module.exports.run = async (client, message, args) => {
	const prefixesdatabase = client.settings.ensure(message.guild.id, settings);

	const embed6 = new Discord.MessageEmbed()
		.setDescription(
			`:x: ${message.author.username}, Eksik İzin!`
		)
		.setColor("RED");
	const missingn = new Discord.MessageEmbed()
		.setDescription(
			`:x: Kullanım: **\`${prefixesdatabase.prefix}sil <1 - 100>\`**`
		)
		.setColor("RED");
	if (!message.member.hasPermission("MANAGE_MESSAGES")) {
		return message.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	}
	if (!args[0]) {
		return message.channel
			.send(missingn)
			.then(m => m.delete({ timeout: 7000 }));
	}

	const embedgg = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(
			`:x: Tek seferde sadece 1 ila 100 arası kadar mesaj silebilirsin!`
		);

	if (args[0] > 100 || args[0] <= 0)
		return message.channel.send(embedgg).then(m => m.delete({ timeout: 5000 }));

	const embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle("Mesaj Silme")
		.addField("Kullanıcı", `<@${message.author.id}> `)
		.addField("Temizlenen Mesaj", `**${args[0]}**`)
		.addField("Kanal", `${message.channel} | **${message.channel.name}**`);

	const kntlembed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setDescription(`✅ **${args[0]}** Mesaj Temizlendi`);

	try {
		message.delete();
		message.channel.bulkDelete(args[0]).then(() => {
			message.channel.send(kntlembed).then(m => m.delete({ timeout: 4000 }));
		});
	} catch (e) {
		const embedssss = new Discord.MessageEmbed()
			.setTitle("**Mesaj Temizleme**")
			.setDescription(`**Hata:** \`\`\`${e}\`\`\``)
			.setColor("RED");

		message.delete();
		return message.channel
			.send(embedssss)
			.then(m => m.delete({ timeout: 7000 }));
	}
};

module.exports.help = {
	name: "clear",
	description: "Clear the message with amount",
	usage: "d!clear <amount>(1-99)",
	accessableby: "Manage Message",
	aliases: ["sil"]
};
