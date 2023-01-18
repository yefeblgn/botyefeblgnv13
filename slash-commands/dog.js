const Discord = require("discord.js");
const request = require("request");

module.exports = {
	name: "dog",
	description: "Herhangi bir köpek resmi yollar!",
	commandOptions: null,
	execute(interaction) {
		request("https://some-random-api.ml/img/dog", (error, _response, body) => {
			const json = JSON.parse(body);
			const { link } = json;

			const emb = new Discord.MessageEmbed();
			emb.setDescription("İşte köpek resmin:");
			emb.setColor("GREEN");
			emb.setImage(link);

			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [emb]
					}
				}
			});
		});
	}
};
