const ms = require("ms");

exports.run = async (client, message, args) => {
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

	// Reroll the giveaway
	client.giveawaysManager
		.reroll(giveaway.messageID)
		.then(() => {
			// Success message
			message.channel.send("Çekiliş tekrar çekildi!");
		})
		.catch(e => {
			if (
				e.startsWith(
					`Bu IDye sahip çekiliş ${giveaway.messageID} daha sonlanmadı.`
				)
			) {
				message.channel.send("Çekiliş daha sonlanmadı!");
			} else {
				console.error(e);
				message.channel.send("Bilinmeyen hata...");
			}
		});
};

module.exports.help = {
	name: "çekiliştekrarla",
	description: "Çekilişleri tekrarlamak için kullanılır.",
	usage: "!çekiliştekrarla <çekiliş mesaj id>",
	accessableby: "Manage Messages",
	aliases: ["çekiliştekrarla"]
};
