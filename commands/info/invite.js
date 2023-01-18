const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	const embed = new Discord.MessageEmbed()
		.setAuthor(`Beni Sunucuna Davet Et!`, client.user.displayAvatarURL())
		.setColor("#2A2A2A")
		.setDescription(
			`[Buraya Tıkla! (Önerilen İzinler)](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=3757436791&scope=bot%20applications.commands)\n[Buraya Tıkla (Yönetici İzinli)](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`
		)
  .addField("Bazı komutların düzgün çalışması için önerilen seçenek;", "``Yönetici İzinli``")
		.setFooter(`BOT yefeblgN | Davet Komutu`);
	message.channel.send(embed);
};

module.exports.help = {
	name: "botdavet",
	description: "Botumuzun davet linkini yollar.",
	usage: "!botdavet",
	accessableby: "Members",
	aliases: ["botdavet"]
};
