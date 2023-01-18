const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
	const settings = require("../../config/settings.json");
	const prefixesdatabase = client.settings.ensure(message.guild.id, settings);

	const helpArgs = args[0];

	if (!helpArgs) {
		const embed = new MessageEmbed()
			.setAuthor(
				`${client.user.username} | Doki Doki Edebiyat Kulübü!`,
				client.user.displayAvatarURL()
			)
			.setColor("GREEN")
			.setDescription(
				`**Doki Doki Edebiyat Kulübü Üyesi Olmak İçin Lütfen** 📚 **Emojisine Tıklayınız!** \n[Buraya](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) tıklayarak beni sunucuna davet edebilirsin.`
			)
			.addField("⚠️ ``Kulüp içerisinde oluşacak olumsuz davranışlardan biz sorumlu değiliz```⚠️")
			.setFooter(
				`BOT yefeblgN Doki Doki Edebiyat Kulübü | Katılmak İçin Tepkiye Bas`
			);
		return message.channel.send({ embed });
	};

};

module.exports.help = {
	name: "yardım",
	description: "Tüm komutları gösterir.",
	usage: "!yardım",
	accessableby: "Members",
	aliases: ["ddlcduyuru"]
};