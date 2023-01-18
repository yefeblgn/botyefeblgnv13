const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = (client, message, args) => {
	const dfgrdgdfgdf = new Discord.MessageEmbed()
		.setDescription(`✅ **Kilitleme kaldırıldı**`)
		.setColor("GREEN");
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			`:x: Kanalı yönetme iznim yok!`
		)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	if (!client.lockit) client.lockit = [];
	const time = args.join(" ");
	const validUnlocks = ["kaldır", "kilitkaldır"];
	const mmqembed = new Discord.MessageEmbed()
		.setDescription(
			`:x: ${message.author.username}, İznin Yok!`
		)
		.setColor("RED");
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(mmqembed)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	const ddd = new Discord.MessageEmbed()
		.setDescription(
			`:x: **Kilitleme için saat, dakika veya saniye olarak bir süre ayarlamalısınız.**`
		)
		.setColor("RED");
	if (!time) return message.channel.send(ddd);

	if (validUnlocks.includes(time)) {
		message.channel
			.createOverwrite(message.guild.id, {
				SEND_MESSAGES: null
			})
			.then(() => {
				message.channel.send(dfgrdgdfgdf);
				clearTimeout(client.lockit[message.channel.id]);
				delete client.lockit[message.channel.id];
			})
			.catch(error => {
				console.log(error);
			});
	} else {
		message.channel
			.createOverwrite(message.guild.id, {
				SEND_MESSAGES: false
			})
			.then(() => {
				const bsuembed = new Discord.MessageEmbed()
					.setDescription(
						`✅ Şu süreye kadar kanalı kitledim: **${ms(ms(time), {
							long: true
						})}**`
					)
					.setColor("GREEN");

				message.channel
					.send(bsuembed)
					.then(() => {
						client.lockit[message.channel.id] = setTimeout(() => {
							message.channel
								.createOverwrite(message.guild.id, {
									SEND_MESSAGES: true
								})
								.then(message.channel.send(dfgrdgdfgdf))
								.catch(console.error);
							delete client.lockit[message.channel.id];
						}, ms(time));
					})
					.catch(error => {
						console.log(error);
					});
			});
	}
};

module.exports.help = {
	name: "lockchannel",
	description: "This command is used for locking the channels.",
	usage: "d!lockchannel <duration>",
	accessableby: "Manage Channels",
	aliases: ["kanalkilitle"]
};
