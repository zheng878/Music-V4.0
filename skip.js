module.exports.run = async (bot, msg, args) => {
  if(!msg.member.voice.channel) return msg.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.errors} | 你必須要在語音頻道裡面!` }})
  if(!bot.player.isPlaying(msg.guild.id)) return msg.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.errors} | 目前沒有播放中的歌曲!` }}) 
  if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send("❌ 你需要管理員權限來使用此指令")

 let song = await bot.player.skip(msg.guild.id);
 msg.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.success} | 跳至下一首` }});
}
module.exports.config = {
  name: "skip",
  aliases: ["next"]
}