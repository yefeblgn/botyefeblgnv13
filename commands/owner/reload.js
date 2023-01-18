const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../config/config.json");

module.exports.run = async (client, message, args) => {
	if (message.author.id != process.env.OWNERID)
		return message.channel.send("Only my developer can use this command...");

	message.channel.send(
		":warning: Tüm komutlar yeniden yüklendiğinde, tüm komutlar en son değişikliklere dönüştürülecek! Onaylamak için **(onayla)** yazın! Eğer yazmazsanız '20' saniye içinde iptal edilecek."
	);
	await message.channel
		.awaitMessages(
			m => m.author.id === message.author.id && m.content === "oynat",
			{
				max: 1,
				time: 20000,
				errors: ["time"]
			}
		)
		.then(collected => {
			const folders = fs.readdirSync("./commands/");
			for (const files of folders) {
				const folder = fs
					.readdirSync(`./commands/${files}/`)
					.filter(file => file.endsWith(".js"));
				for (const commands of folder) {
					const command = require(`../../commands/${files}/${commands}`);
					delete require.cache[require.resolve(`../${files}/${commands}`)];
					client.aliases.delete(command.help.aliases);
					const commandName = commands.split(".")[0];
					console.log(`Reloaded Command: ${commands}`);
					client.commands.set(commandName, command);
					command.help.aliases.forEach(alias => {
						client.aliases.set(alias, commandName);
					});
				}
			}
			return message.channel.send("komut yeniden yüklendi");
		})
		.catch(collected =>
			message.channel.send(
				":x: | Süre doldu! Komutları yeniden yükle eylemleri iptal edildi!"
			)
		);
};

module.exports.help = {
	name: "reload-all",
	description:
		"This command is used for reload all commands without rebooting/restart the bot.",
	usage: "d!reload-all",
	accessableby: "Bot Owners",
	aliases: ["yenile"]
};
