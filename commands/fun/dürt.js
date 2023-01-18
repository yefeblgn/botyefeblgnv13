const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	if (!message.mentions.users.first())
		return message.reply("Dürtmek istediğin kişiyi etiketlemelisin!");
	if (message.mentions.users.first().id == message.author.id)
		return message.reply("Kendini dürtemezsin :thinking:");
	const { body } = await superagent
		.get("https://nekos.life/api/v2/img/poke")
		.catch(e => {
			if (e) {
				message.channel.send("Bir sorun oluştu!");
				console.log(e);
			}
		});

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setDescription(
			`Hey <@${message.mentions.users.first().id}>, <@${
				message.author.id 
			}> Seni Dürttü!`
		)
		.setImage(body.url)
		.setFooter("BOT yefeblgN | Eğlence Komutları");
	message.channel.send({ embed });
};

module.exports.help = {
	name: "dürt",
	description: "Etiketlediğin kişiyi dürtersin.",
	usage: "!dürt <kullanıcı>",
	accessableby: "Members",
	aliases: ["dürt"]
};
