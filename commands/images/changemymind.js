const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			":yum: **Lütfen fikrini belirt!**"
		)
		.setColor("RED");
	const mindtxt = args.slice(0).join(" ");
	if (!mindtxt) {
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 10000 }));
	}

	const image = await canvacord.Canvas.changemymind(mindtxt);

	const triggered = new Discord.MessageAttachment(image, "changemymind.png");

  message.channel.send(`Hey <@${
				message.author.id
			}>, İşte düşüncen!`);
  	message.channel.send(triggered);

  
};

module.exports.help = {
	name: "changemymind",
	description: "Kendi fikrinizi sunduğunuz bir meme templatei.",
	usage: "changemymind <yazı>",
	accessableby: "Member",
	aliases: ["changemymind", "cmm"]
};
