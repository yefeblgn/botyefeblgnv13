const Discord = require("discord.js");
const request = require("request");

module.exports = {
	name: "cat",
	description: "Herhangi bir kedi resmi yollar!",
	commandOptions: null,
	execute(interaction) {
		request("https://some-random-api.ml/img/cat", (error, _response, body) => {
			const json = JSON.parse(body);
			const { link } = json;

			const emb = new Discord.MessageEmbed();
			emb.setDescription("İşte kedi resmin:");
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
