const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	const { body } = await superagent.get("https://nekos.life/api/v2/img/ngif");

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setDescription(`<@${message.author.id}> OwO, Neko neko niiee. İşte neko gifin!`)
		.setImage(body.url)
		.setFooter("BOT yefeblgN | Eğlence Komutları");
	message.channel.send({ embed });
};

module.exports.help = {
	name: "neko",
	description: "Herhangi bir Neko Gifi Yollar.",
	usage: "!neko",
	accessableby: "Members",
	aliases: ["neko"]
};
