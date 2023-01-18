const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	if (message.channel.nsfw === true) {
		const { body } = await superagent.get(
			"https://nekos.life/api/v2/img/hentai"
		);

		const embed = new Discord.MessageEmbed()
			.setColor("#ff9900")
			.setTitle("Hentai Fotoğrafları")
			.setImage(body.url)
			.setFooter(`BOT yefeblgN | NSFW Komutları | Bu Komutu Kullanan ${message.author.username}#${message.author.discriminator}`);
		message.channel.send({ embed });
	} else {
		message.channel.send("Bu kanal NSFW kanalı değil!");
	}
};

module.exports.help = {
	name: "hentai",
	description:
		"This command is used for calling NSFW images API to send them, but NSFW channel needed.",
	usage: "d!hentai",
	accessablechannel: "NSFW Channel",
	accessableby: "NSFW/Member",
	aliases: ["hentai"]
};
