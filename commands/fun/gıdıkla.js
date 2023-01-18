const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	if (!message.mentions.users.first())
		return message.reply("You need to mention someone to tickle them");
	if (message.mentions.users.first().id === "242263403001937920")
		return message.reply("You can't tickle him. He will explode on impact!");
	const { body } = await superagent.get("https://nekos.life/api/v2/img/tickle");

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setDescription(
			`Hey <@${message.mentions.users.first().id}>, <@${
				message.author.id
			}> Seni Gıdıkladı!`
		)
		.setImage(body.url)
		.setFooter("BOT yefeblgN | Eğlence Komutları");
	message.channel.send({ embed });
};

module.exports.help = {
	name: "gıdıkla",
	description: "Etiketlediğin kişiyi gıdıklar.",
	usage: "!gıdıkla <kullanıcı>",
	accessableby: "Member",
	aliases: ["gıdıkla"]
};
