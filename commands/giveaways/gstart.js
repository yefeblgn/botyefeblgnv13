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

	// Giveaway channel
	const giveawayChannel = message.mentions.channels.first();
	// If no channel is mentionned
	if (!giveawayChannel) {
		return message.channel.send(":x: Geçerli bir kanaldan bahsetmelisin!");
	}

	// Giveaway duration
	const giveawayDuration = args[1];
	// If the duration isn't valid
	if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
		return message.channel.send(":x: Geçerli bir süre belirtmelisiniz!");
	}

	// Number of winners
	const giveawayNumberWinners = args[2];
	// If the specified number of winners is not a number
	if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
		return message.channel.send(
			":x: Geçerli bir kazanan sayısı belirtmelisiniz!"
		);
	}

	// Giveaway prize
	const giveawayPrize = args.slice(3).join(" ");
	// If no prize is specified
	if (!giveawayPrize) {
		return message.channel.send(":x: Geçerli bir ödül belirtmelisiniz!");
	}

	// Start the giveaway
	client.giveawaysManager.start(giveawayChannel, {
		// The giveaway duration
		time: ms(giveawayDuration),
		// The giveaway prize
		prize: giveawayPrize,
		// The giveaway winner count
		winnerCount: parseInt(giveawayNumberWinners),
		// Who hosts this giveaway
		hostedBy: client.config.hostedBy ? message.author : null,
		// Messages
		messages: {
			giveaway: `${
				client.config.everyoneMention ? "@everyone\n\n" : ""
			}🎉🎉 **ÇEKİLİŞ!** 🎉🎉`,
			giveawayEnded: `${
				client.config.everyoneMention ? "@everyone\n\n" : ""
			}🎉🎉 **ÇEKİLİŞ BİTTİ...** 🎉🎉`,
			timeRemaining: "Kalan Süre: **{duration}**!",
			inviteToParticipate: "Katılmak için  🎉  tepkisine tıkla!",
			winMessage: "Tebrikler, {winners}! Sen Kazandın. İşte Ödülün: **{prize}**!",
			embedFooter: "BOT yefeblgN | Çekiliş Sistemi",
			noWinner: "Çekiliş iptal edildi, geçerli katılım yok.",
			hostedBy: "Çekilişi Başlatan: {user}",  
			endedAt: "Sona Erdi",
			units: {
				seconds: "saniye",
				minutes: "dakika",
				hours: "saat",
				days: "gün",
				pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
			}
		}
	});

};

module.exports.help = {
	name: "çekilişbaşlat",
	description: "Çekiliş başlatırsınız.",
	usage: "!çekilişbaşlat <kanal> <süre> <kazanan sayısı> <ödül>",
	accessableby: "Member",
	aliases: ["çekilişbaşlat"]
};
