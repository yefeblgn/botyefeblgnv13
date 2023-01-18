const Discord = require("discord.js");
const settings = require("../../config/settings.json");
const timestamps = new Discord.Collection();

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;
  const prefixesdatabase = client.settings.ensure(message.guild.id, settings);
  if (!client.settings.has(message.guild.id)) {
    client.settings.set(message.guild.id, {
      prefix: settings.prefix
    });
  }
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    return message.reply(`Prefixim: \`${prefixesdatabase.prefix}\``);
  }
  if (!message.content.startsWith(prefixesdatabase.prefix)) return;
  const command = message.content
    .split(" ")[0]
    .slice(prefixesdatabase.prefix.length);
  const cmd = client.commands.has(command) ? client.commands.get(command) : client.aliases.has(command) ? client.commands.get(client.aliases.get(command)) : null;
  if (!cmd) return;
  const now = Date.now();
  const cooldownAmount = cmd.cooldown || 2000;
  if (timestamps.has(message.author.id + cmd.name)) {
    const expirationTime = timestamps.get(message.author.id + cmd.name);
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 2000;
      return message.reply(
        `**${prefixesdatabase.prefix
        }${command}** komutunu kullanmadan önce **${timeLeft.toFixed(
          1
        )} saniye bekleyiniz!**`
      );
    }
  }
  timestamps.set(message.author.id + cmd.name, now + cooldownAmount);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  try {
    return cmd.run(client, message, message.content.split(" ").slice(1));
  } catch (e) {
    console.log(`Invalid command: ${command}`);
  } finally {
    console.log(`${message.author.username} using command ${prefixesdatabase.prefix}${command}`);
  }
};
