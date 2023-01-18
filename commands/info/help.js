const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
	const settings = require("../../config/settings.json");
	const prefixesdatabase = client.settings.ensure(message.guild.id, settings);

	const helpArgs = args[0];

	if (!helpArgs) {
		const embed = new MessageEmbed()
			.setAuthor(
				`${client.user.username} | Komut Listesi`,
				client.user.displayAvatarURL()
			)
			.setColor("GREEN")
			.setDescription(
				`**Prefixim:** \`${prefixesdatabase.prefix}\` , Slash Komutları Listesi İçin \`/yardım\`\n[Buraya](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) tıklayarak beni sunucuna davet edebilirsin.`
			)
			.addField("**📱Genel Komutlar**", "`yardım`, `ping`, `afk`, `avatar`, `botdavet`")
			.addField(
				"**⚙ Sunucu Komutları**",
				"`botistatistik`, `sunucubilgi`, `kullanıcıbilgi`"
			)
			.addField(
				"**🎃 Eğlence Komutları**",
				"`öp`, `neko`, `kafasınıokşa`, `dürt`, `gıdıkla`, `tersçevir`, `changemymind`, `lgbt`, `clyde`, `iphone`, `magik`, `petpet`, `rip`, `trigger`, `duvarkağıdı`"
			)
			.addField(
				"**:tada: Çekiliş Komutları** ``(Beta)``",
				"`çekilişbaşlat`, `çekiliştekrarla`, `çekilişbitir`"
			)
			.addField(
				"**🛠️ Moderasyon Komutları**",
				"`ban`, `sil`, `emojioluştur`, `kick`, `kanalkilitle`, `sustur`, `isim`, `yavaşmod`, `bankaldır`, `kanalkilit kaldır`, `susturmakaldır`"
			)
			.addField(
				"**:underage:NSFW Komutları** ``(Uyarı yersek bu komutlar kaldırılacaktır!)``",
				"`4knsfw`, `anal`, `göt`, `hentai`, `holo`, `vajina`, `porno`, `kalça`"
			)
			.addField("**:gear:Bot Ayar Komutları**", 
                "`setprefix`")
			.setFooter(
				`BOT yefeblgN Yardım Komutu | Komutu kullanan kullanıcı ${message.author.username}#${message.author.discriminator}`
			);
		return message.channel.send({ embed });
	};

	if (helpArgs) {
		//let command = helpArgs
			const command = client.commands.has(helpArgs) ? client.commands.get(helpArgs) : client.aliases.has(helpArgs) ? client.commands.get(client.aliases.get(helpArgs)) : null;
            if(!command) {
				const embeds = new MessageEmbed()
				.setDescription(`:x: Komut bulunamadı!`)
				.setColor("RED");
			   return message.channel.send(embeds);
			};
			if (command.help.aliases < 1) alia = "Başka kullanımı yok";
			const embed = new MessageEmbed()
				.setAuthor(
					`Komut: ${command.help.name}`,
					client.user.displayAvatarURL()
				)
				.setDescription(
					`
            **Açıklama:**\n\`\`\`${
							command.help.description ||
							"Bu komut için Açıklama yok."
						}\`\`\`\n**Kullanım:**\n\`\`\`${
						command.help.usage || "Kullanım yok"
					}\`\`\`\n**İzinler:**\n\`\`\`${
						command.help.accessableby || "Kullanıcılar"
					}\`\`\`\n**Diğer Kullanımlar:**\n\`\`\`${alia}\`\`\``
				)
				.setColor("#4a4b4d")
				.setFooter(
					`BOT yefeblgN Yardım Komutu | Komutu kullanan kullanıcı ${message.author.username}#${message.author.discriminator}`
				);
			return message.channel.send(embed);
	}
};

module.exports.help = {
	name: "yardım",
	description: "Tüm komutları gösterir.",
	usage: "!yardım",
	accessableby: "Members",
	aliases: ["yardım"]
};