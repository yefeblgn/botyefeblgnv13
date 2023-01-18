const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			":x: **Emoji ekleme yetkisine sahip değilim!**"
		)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_EMOJIS"))
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	try {
		const embed6 = new Discord.MessageEmbed()
			.setDescription(
				`:no_entry_sign: ${message.author.username}, Eksik İzin!`
			)
			.setColor("RED");
		if (!message.member.hasPermission("MANAGE_EMOJIS"))
			return message.channel.send(embed6).then(msg => msg.delete(5000));
		const emoji = message.attachments.array()[0] || args[0];

		if (emoji) {
			if (emoji.url) {
				if (args[0]) {
					message.guild.emojis
						.create(emoji.url, args[0])
						.then(emoji =>
							message.channel.send(`Emoji oluşturuldu: ${emoji.name}!`)
						)
						.catch(err =>
							message.reply(`Emojiyi oluşturamadım!\n${err}`)
						);
				} else message.reply("Emojinin adını girmen gerekiyor!");
			} else if (args[1]) {
				message.guild.emojis
					.create(emoji, args[1])
					.then(emoji =>
						message.channel.send(`Emoji oluşturuldu: ${emoji.name}!`)
					)
					.catch(err => message.reply(`Emojiyi oluşturamadım!\n${err}`));
			} else message.reply("Emojinin adını girmen gerekiyor!");
		} else message.reply("Emoji için görseli vermeniz gerekiyor!");
	} catch (err) {
		message.channel.send(`Hata oluştu!\n${err}`).catch();
	}
};

module.exports.help = {
	name: "createemoji",
	description: "Create emoji easily with commands",
	usage: "d!createemoji <name> <attachments>",
	accessableby: "Manage Emojis",
	aliases: ["emojioluştur"]
};
