const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	try {
		const member = message.mentions.members.first();
		require("request")(
			{ url: "https://nekos.life/api/kiss", json: true },
			(req, res, json) => {
				if (member) {
					const embed = new Discord.MessageEmbed()
						.setDescription(
							`<@${message.author.id}>, <@${member.user.id}> adlı kullanıcıyı öptü. Hoaydaaa <3333`
						)
						.setColor("#eeeeee")

						.setImage(json.url);

					message.channel.send(embed);
				} else message.reply("Öpeceğin kişiyi etiketlemelisin!");
			}
		);
	} catch (err) {
		message.channel.send(`Bir hata oluştu!\n${err}`).catch();
	}
};

module.exports.help = {
	name: "öp",
	description: "Etiketlediğin kişiyi öpersin.",
	usage: "!öp <kullanıcı>",
	accessableby: "Member",
	aliases: ["öp"]
};
