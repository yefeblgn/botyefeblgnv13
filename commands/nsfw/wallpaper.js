const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args, tools) => {
	const { body } = await superagent.get(
		"https://nekos.life/api/v2/img/wallpaper"
	);

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle("Anime Duvar Kağıdı")
		.setImage(body.url)
  .setFooter(`BOT yefeblgN | Eğlence Komutları | Bu Komutu Kullanan ${message.author.username}#${message.author.discriminator}`);
	message.channel.send({ embed });
};

module.exports.help = {
	name: "wallpaper",
	description: "Generating NSFW wallpapers randomly",
	usage: "d!wallpaper",
	accessableby: "NSFW/Member",
	aliases: ["duvarkağıdı"]
};
