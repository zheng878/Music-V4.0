module.exports.run = async (bot, msg, args) => {
  if(!msg.member.voice.channel) return msg.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.errors} | 你必須要在語音頻道裡面!` }})
  if(!bot.player.isPlaying(msg.guild.id)) return msg.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.errors} | 目前沒有播放中的歌曲!` }})

 let song = await bot.player.nowPlaying(msg.guild.id);
 msg.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.success} | 正在播放${song.name}` }});
}
module.exports.config = {
  name: "np",
  aliases: ["now-playing"]
}