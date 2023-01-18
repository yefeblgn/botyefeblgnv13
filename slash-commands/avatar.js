const Discord = require("discord.js");

module.exports = {
	name: "avatar",
	description: "Profil Fotoğrafını Gönderir!",
	commandOptions: [
		{
			type: 6,
			name: "kullanıcı",
			description: "Herhangi bir kullanıcının profil fotoğrafını alabilirsin!",
			required: false
		}
	],
	execute(interaction) {
		const checkuser = interaction.data.options; // .options[0].value;
		if (checkuser) {
			userid = interaction.data.options[0].value;
		} else {
			userid = interaction.member.user.id;
		}
		// let id = interaction.data.options[0].value
		//	id.replace(/[\\<>@#&!]/g, "");
		const userss = client.users.fetch(userid);
		userss.then(result => {
			const avatar = result.displayAvatarURL({
				format: "png",
				dynamic: true,
				size: 4096
			});
			const embed = new Discord.MessageEmbed()
				.setColor("GREEN")
				.setDescription(`İşte <@${result.id}> adlı kullanıcının profil fotoğrafı:`)
				.setImage(`${avatar}`);

			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [embed]
					}
				}
			});
		});
	}
};
