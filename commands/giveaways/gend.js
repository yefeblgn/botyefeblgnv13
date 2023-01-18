const ms = require("ms");

module.exports.run = async (client, message, args) => {
	// If the member doesn't have enough permissions
	if (
		!message.member.hasPermission("MANAGE_MESSAGES") &&
		!message.member.roles.cache.some(r => r.name === "Yetkili Ekibi")
	) {
		return message.channel.send(
			":x: Çekilişleri yönetmek için için ``Mesajları Yönet`` izinlerine sahip olmanız gerekir."
		);
	}

	// If no message ID or giveaway name is specified
	if (!args[0]) {
		return message.channel.send(":x: Geçerli bir mesaj IDsi belirtmelisiniz!");
	}

	// try to found the giveaway with prize then with ID
	const giveaway =
		// Search with giveaway prize
		client.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
		// Search with giveaway ID
		client.giveawaysManager.giveaways.find(g => g.messageID === args[0]);

	// If no giveaway was found
	if (!giveaway) {
		return message.channel.send(
			`\`${args.join(" ")}\` için bir çekiliş bulunamadı.`
		);
	}

	// Edit the giveaway
	client.giveawaysManager
		.edit(giveaway.messageID, {
			setEndTimestamp: Date.now()
		})
		// Success message
		.then(() => {
			// Success message
			message.channel.send(
				`Çekiliş ${
					client.giveawaysManager.options.updateCountdownEvery / 1000
				} saniyeden daha kısa sürede sona erecek...`
			);
		})
		.catch(e => {
			if (
				e.startsWith(
					`Mesaj IDsi ile çekiliş ${giveaway.messageID} çoktan bitti.`
				)
			) {
				message.channel.send("Bu çekiliş zaten bitti!");
			} else {
				console.error(e);
				message.channel.send("Bilinmeyen hata...");
			}
		});
};

module.exports.help = {
	name: "çekilişbitir",
	description: "Bu komut, çekilişleri sonlandırmak için kullanılır.",
	usage: "!çekilişbitir <çekiliş mesaj idsi>",
	accessableby: "Manage Messages",
	aliases: ["çekilişbitir"]
};
