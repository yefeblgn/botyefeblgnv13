const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const config = require("../../config/config.json");

module.exports.run = async (client, message, args) => {
	const muteusermentioned = message.mentions.users.first();
	const tomute =
		muteusermentioned ||
		(args[0]
			? args[0].length == 18
				? message.guild.members.cache.get(args[0]).user
				: false
			: false);

	const notice3 = new Discord.MessageEmbed()
		.setDescription(`:x: İnsanları susturma alma iznim yok!`)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
		return message.channel.send(notice3).then(m => m.delete({ timeout: 5000 }));
	}

	//! tempmute @user 1s/m/h/d
	const embed6 = new Discord.MessageEmbed()
		.setDescription(
			`:x: ${message.author.username}, İznin Yok!`
		)
		.setColor("RED");
	if (!message.member.hasPermission("MANAGE_MESSAGES")) {
		return message.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	}
	const embed50 = new Discord.MessageEmbed()
		.setTitle("Komut: !sustur")
		.setDescription("Kullanım: !sustur @kullanıcı [süre] [sebep]")
		.setColor(0xff0000);

	if (!tomute) return message.channel.send(embed50);

	const notice2 = new Discord.MessageEmbed()
		.setDescription(`:x: kendini susturamazsın!`)
		.setColor("RED");
	if (tomute.id === message.author.id) return message.channel.send(notice2);

	const dsfdsfsdf = new Discord.MessageEmbed()
		.setDescription(
			`:x: Banlamaya çalıştığın kişinin rolü senin rolünden yüksek!`
		)
		.setColor("RED");
	const sdfsdfsdfsd = new Discord.MessageEmbed()
		.setDescription(
			`:x: Banlamaya çalıştığın kişinin rolü benim rolündem yüksek!`
		)
		.setColor("RED");
	const sdfsdfsdfsssd = new Discord.MessageEmbed()
		.setDescription(`:x: Lütfen susturma süresini yazın!`)
		.setColor("RED");
	const dddfs = new Discord.MessageEmbed()
		.setDescription(
			`:x: Maksimum 14 gün susturabilirsin!`
		)
		.setColor("RED");
	const botRolePossition = message.guild.member(client.user).roles.highest
		.position;
	const rolePosition = message.guild.member(tomute).roles.highest.position;
	const userRolePossition = message.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return message.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition)
		return message.channel.send(sdfsdfsdfsd);

	let muterole = client.guilds.cache
		.get(message.guild.id)
		.roles.cache.find(val => val.name === "Muted");
	if (!muterole) {
		try {
			muterole = await message.guild.roles.create({
				data: {
					name: "Muted",
					color: "#000000",
					permissions: []
				}
			});
			message.guild.channels.cache.forEach(async channel => {
				await channel.overwritePermissions(muterole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});
		} catch (e) {
			console.log(e.stack);
		}
	}

	// end of create role
	const mutetime = args[1];
	if (!mutetime) return message.channel.send(embed50);
	if (isNaN(ms(mutetime))) return message.channel.send(sdfsdfsdfsssd);
	if (ms(mutetime) > 1209600000) return message.channel.send(dddfs);
	let reason = args.slice(2).join(" ");
	if (reason.length < 1) reason = "Sebep girilmedi.";

	const bruhembed = new Discord.MessageEmbed()
		.setDescription(
			`:x: **${tomute.username}#${tomute.discriminator}** daha önce susturuldu!`
		)
		.setColor("GREEN");

	const key = `${message.guild.id}-${tomute.id}`;

	client.moderationdb.ensure(key, {
		guildid: message.guild.id,
		userid: tomute.id,
		warns: 0,
		isMuted: false,
		timeMuteEnd: 0
	});
	// if (tomute.roles.cache.has(muterole)) return message.channel.send(bruhembed);

	const embed = new Discord.MessageEmbed()
		.setTitle("Susturma")
		.setColor("RED")
		.addField("Hedef", `<@${tomute.id}>`)
		.addField("Susturan", `<@${message.author.id}>`)
		.addField("Susturma Süresi", `${ms(ms(mutetime))}`)
		.addField("Sebep", `\`\`\`${reason}\`\`\``)
		.setTimestamp()
		.setFooter("BOT yefeblgN | Moderasyon Sistemi");

	const embed10 = new Discord.MessageEmbed()
		.setDescription(
			`✅ **${tomute.username}#${tomute.discriminator}** adlı kullanıcı susturuldu. | Sebep: **${reason}**`
		)
		.setColor("GREEN");
	const rightNow = Date.now();
	const mutedurationend = ms(mutetime) + rightNow;
	await client.moderationdb.set(
		`${message.guild.id}-${tomute.id}`,
		true,
		"isMuted"
	);
	await client.moderationdb.set(
		`${message.guild.id}-${tomute.id}`,
		mutedurationend,
		"timeMuteEnd"
	);
	await message.guild.member(tomute).roles.add(muterole);
	message.delete();
	message.channel.send(embed10);
  const bandm = new Discord.MessageEmbed()
		.setDescription(
			`🔨 Bir Sunucuda Susturuldun!`)
.addField("Susturulduğun Sunucu:", `${message.guild.name}`)
.addField("Susturulma Süresi:", `${ms(ms(mutetime))}`)
  .addField("Susturulma Sebebi:", `${reason}`)
.setColor("RED")
.setThumbnail("https://cdn.discordapp.com/attachments/953034236061970453/953037189527273543/kisspng-smiley-emoticon-computer-icons-feeling-emoji-5b384486c6c0e2.1396481015304142148142_1.png")
.setFooter("BOT yefeblgN | Moderasyon Sistemi")
	tomute.send(bandm);
};

module.exports.help = {
	name: "mute",
	description: "This command is used for muting some people really annoying.",
	usage: "d!mute <mention> <duration> <reason>",
	accessableby: "Manage Roles",
	aliases: ["sustur", "mute"]
};
