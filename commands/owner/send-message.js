const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	if (message.author.id != process.env.OWNERID)
		return message.channel.send("Bu komutu yalnızca geliştiricim kullanabilir...");
	const msg = args.slice(0).join(" ");
	if (!msg) return message.reply("bir şey gönder!");
	message.channel.send(msg);
};

module.exports.help = {
	name: "send-message",
	description: "N/A",
	usage: "d!send-message [Message]",
	accessableby: "Bot Owners",
	aliases: ["yaz"]
};
