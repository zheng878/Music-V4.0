module.exports.config = {
  name: "volume",
  aliases: ["vol"]
}
module.exports.run = async (bot, msg, args) => {
  if (args.length != 1) return msg.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.errors} | 用法: 8!volume (0-100)`}})
  bot.player.setVolume(msg.guild.id, parseInt(args[0]));
  msg.channel.send(`音量設置為 ${args[0]} !`);
}