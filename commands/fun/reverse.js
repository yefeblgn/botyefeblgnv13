module.exports.run = async (client, message, args) => {
	try {
		if (!args[0])
			return message.reply("Ters çevirmek için metni girmeniz gerekir!");

		const str = args.join(" ");
		const msg = await message.reply("İşte ters çevrilmiş cümlen/kelimen: " + str.split("").reverse().join(""));
		msg.react("🔁");
	} catch (err) {
		message.channel.send(`Bir hatayla karşılaştım!\n${err}`).catch();
	}
};

module.exports.help = {
	name: "tersçevir",
	description: "Bu komut kelimeleri ters çevirmek için kullanılır.",
	usage: "!tersçevir",
	accessableby: "Member",
	aliases: ["tersçevir"]
};
