const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = (client, msg, args) => {
	if (msg.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "pgif" })
			.end((err, response, body) => {
				const emb = new discord.MessageEmbed()
					.setImage(response.body.message)
					.setColor("#00ff00")
					.setTitle("Porno Gif Fotoğrafları")
        .setImage(response.body.message)
					.setFooter(
						`BOT yefeblgN | NSFW Komutları | Bu Komutu Kullanan ${msg.author.username}#${msg.author.discriminator}`
					);

				msg.channel.send(emb);
			});
	} else {
		msg.channel.send("Bu kanal NSFW kanalı değil!");
	}
};

module.exports.help = {
	name: "porn",
	description:
		"This command is used for calling NSFW images API to send them, but NSFW channel needed.",
	usage: "d!poke <mention>",
	accessableby: "NSFW/Members",
	aliases: ["porno", "porn"]
};
