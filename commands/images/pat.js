const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	// eslint-disable-line no-unused-vars
	try {
		const member = message.mentions.members.first();

		require("request")(
			{ url: "https://nekos.life/api/pat", json: true },
			(req, res, json) => {
				if (member) {
					const embed = new Discord.MessageEmbed()
						.setDescription(`<@${message.author.id}>, <@${member.user.id}> adlı kullanıcının kafasını okşadı. Çok tatlısınız. :face_exhaling:`)
						.setColor("#363942")
						.setImage(json.url);

					message.channel.send(embed);
				} else message.reply("Kafasını okşayacağın kişiyi etiketlemelisin.!");
			}
		);
	} catch (err) {
		message.channel.send(`Bir sorun oluştu!\n${err}`).catch();
	}
};

module.exports.help = {
	name: "kafasınavur",
	description: "Etiketlediğin kişinin kafasına vurursun.",
	usage: "!kafasınavur <kullanıcı>",
	accessableby: "Members",
	aliases: ["kafasınıokşa"]
};
