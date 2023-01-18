const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = (client, msg, args) => {
	if (msg.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "4k" })
			.end((err, response, body) => {
				const emb = new discord.MessageEmbed()
					.setImage(response.body.message)
					.setColor("#00ff00")
					.setTitle("4K NSFW Fotoğraf")
					.setFooter(
						`BOT yefeblgN | NSFW Komutları | Bu Komutu Kullanan ${msg.author.username}#${msg.author.discriminator}`
					);

				msg.channel.send(emb);
			});
	} else {
		msg.channel.send("Burası NSFW odası değil!");
	}
};

module.exports.help = {
	name: "4knsfw",
	description: "This command is used for generating some 4knsfw images.",
	usage: "d!4knsfw",
	accessableby: "NSFW/Member",
	aliases: []
};
