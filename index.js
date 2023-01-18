require("dotenv").config();
const config = require("./config/config.json");
const Enmap = require("enmap");
const {Collection, Client} = require("discord.js");

const client = new Client({
	partials: ["MESSAGE", "USER", "REACTION"],
	disableMentions: "everyone"
});
const DisTube = require("distube");

client.config = config;
global.client = client;
global.nowyear = new Date().getFullYear();
global.emojis = require("./config/emoji.json");

const db = require("quick.db");
const { GiveawaysManager } = require("discord-giveaways");

const nz_date_string = new Date().toLocaleString("en-US", {
	timeZone: "Asia/Hong_Kong"
});

client.commands = new Collection();
client.slcommands = new Collection();
client.aliases = new Collection();
client.colors = client.config.colors;
client.snipes = new Collection();
client.mapss = new Collection();
client.mapss.set("uptimedate", nz_date_string);

["command", "event"].forEach(x =>
	require(`./handlers/${x}.js`)(client)
);

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Power By FastUptime'));

app.listen(port, () =>
    console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)
);

client.settings = new Enmap({
	name: "settings",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: "deep"
});

client.moderationdb = new Enmap("moderation");
client.distube = new DisTube(client, {
	leaveOnFinish: true,
	leaveOnEmpty: true,
	leaveOnStop: true,
	youtubeDL: true,
	updateYouTubeDL: true,
	youtubeCookie:
		"GPS=1; YSC=w5dGoHzqQRI; VISITOR_INFO1_LIVE=B4ElBqxSDv4; PREF=tz=Asia.Hong_Kong"
});

if (!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
	async getAllGiveaways() {
		return db.get("giveaways");
	}

	async saveGiveaway(messageID, giveawayData) {
		db.push("giveaways", giveawayData);
		return true;
	}

	async editGiveaway(messageID, giveawayData) {
		const giveaways = db.get("giveaways");
		const newGiveawaysArray = giveaways.filter(
			giveaway => giveaway.messageID !== messageID
		);
		newGiveawaysArray.push(giveawayData);
		db.set("giveaways", newGiveawaysArray);
		return true;
	}

	async deleteGiveaway(messageID) {
		const newGiveawaysArray = db
			.get("giveaways")
			.filter(giveaway => giveaway.messageID !== messageID);
		db.set("giveaways", newGiveawaysArray);
		return true;
	}
};

client.giveawaysManager = new GiveawayManagerWithOwnDatabase(client, {
	storage: false,
	updateCountdownEvery: 10000,
	endedGiveawaysLifetime: 30000,
	hasGuildMembersIntent: false,
	default: {
		botsCanWin: false,
		exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
		embedColor: "#ff6969",
		embedColorEnd: "#505050",
		reaction: "🎉"
	}
});

client.status = queue =>
	`Ses Düzeyi: \`${queue.volume}%\` | Filtreler: \`${
		queue.filter || "Kapalı"
	}\` | Tekrarla: \`${
		queue.repeatMode
			? queue.repeatMode == 2
				? "Tüm Kuyruk"
				: "Mevcut Şarkı"
			: "Kapalı"
	}\` | Otomatik Oynatma: \`${queue.autoplay ? "Açık" : "Kapalı"}\``;

client.ws.on("INTERACTION_CREATE", async interaction => {
	if (!client.slcommands.has(interaction.data.name)) return;
	try {
		client.slcommands.get(interaction.data.name).execute(interaction);
	} catch (error) {
		console.log(
			`Error from command ${interaction.data.name} : ${error.message}`
		);
		console.log(`${error.stack}\n`);
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: "Sorry, error occurred when running this command!"
				}
			}
		});
	}
});

client.on("ready", () => {
  var actvs = [
    `!botdavet | 🔥 Müzik Komutları Kaldırıldı...`,
    `!sarıl | 🚀 Eğlence Komutları`,
    `!yardım | 🤖 Yeni Slash Komutları`,
  ];

  client.user.setActivity(
    actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)],
    { type: "STREAMING", url: "https://twitch.tv/yefeblgn" }
  );

  console.log("_________________________________________");
  console.log(`Prefix             : ${process.env.prefix}`);
  console.log(`Durum              : Bot Çevrimiçi!`);
  console.log("_________________________________________");
});

client.on("ready", () => {
  client.leaveVoiceChannel;
  let channel = client.channels.cache.get("948331579216896112");
  channel
    .join()
    .then((connection) => console.log("Sesli odaya girdi."))
    .catch(console.error);
});

////////////////
client.on("ready", async () => {
if(db.get("reactions")){
if(Object.keys(db.get("reactions")).length == 0){
await db.delete("reactions")
}}
setInterval(() => {
if(db.get("reactions")){
Object.entries(client.db.get("reactions")).map(j => j[1]).flat().map(async mr => {
if(mr){
const guild = client.guilds.cache.get(mr.guild)
if(guild){
const channel = guild.channels.cache.get(mr.channel)
if(channel){
channel.messages.fetch(mr.message).then(cs => {
}).catch(async e => {
await db.unpush("reactions."+mr.guild, { messsage: mr.message})
await db.delete("messages-"+mr.guild)
await db.delete("channels-"+mr.guild)  
})} else {
await db.unpush("reactions."+mr.guild, { messsage: mr.message})
await db.delete("messages-"+mr.guild)
await db.delete("channels-"+mr.guild)
}} else {
await db.delete("reactions."+mr.guild)
await db.delete("messages-"+mr.guild)
await db.delete("channels-"+mr.guild)
}} else {
await db.unpush("reactions."+mr.guild, { messsage: mr.message})
await db.delete("messages-"+mr.guild)
await db.delete("channels-"+mr.guild)
}})}
}, 200000)
})



client.on("messageReactionAdd", async (reaction, user) => {
if(reaction.message.guild){
if(db.get("reactions."+reaction.message.guild.id)){
const data = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].guild == reaction.message.guild.id).map(me => me[1].guild)
if(data){
const data2 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].channel == reaction.message.channel.id).map(me => me[1].channel)
if(data2){
const data3 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].message == reaction.message.id).map(me => me[1].message)
if(data3){
let data4 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].emoji == reaction.emoji.name)
if(data4){
data4.map(async cs => {
const csr = reaction.message.guild.roles.cache.get(cs[1].role)
if(csr){
const csm = reaction.message.guild.members.cache.get(user.id)
if(csm){
if(!csm.roles.cache.has(csr.id)){
await csm.roles.add(csr.id)  
}}}})
}}}}}}})



client.on("messageReactionRemove", async (reaction, user) => {
  if(reaction.message.guild){
    if(db.get("reactions."+reaction.message.guild.id)){
    const data = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].guild == reaction.message.guild.id).map(me => me[1].guild)
    if(data){
    const data2 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].channel == reaction.message.channel.id).map(me => me[1].channel)
    if(data2){
    const data3 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].message == reaction.message.id).map(me => me[1].message)
    if(data3){
    let data4 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].emoji == reaction.emoji.name)
    if(data4){
    data4.map(async cs => {
    const csr = reaction.message.guild.roles.cache.get(cs[1].role)
    if(csr){
    const csm = reaction.message.guild.members.cache.get(user.id)
    if(csm){
    if(csm.roles.cache.has(csr.id)){
    await csm.roles.remove(csr.id)  
    }}}})
    }}}}}}})

/////////////////////

client.login(process.env.TOKEN);