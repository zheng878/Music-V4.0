module.exports.run = async (bot, msg, args) => {
  if(!msg.member.voice.channel) return msg.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.errors} | 你必須要在語音頻道裡面!` }})
  if(!bot.player.isPlaying(msg.guild.id)) return msg.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.errors} | 目前沒有播放中的歌曲!` }})
if (bot.player.loop == false) {
 bot.player.setRepeatMode(msg.guild.id, true);
 let song = await bot.player.nowPlaying(msg.guild.id)
 msg.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.repeat} | 我將會重複播放 ${song.name}!` }})
  bot.player.loop = true;
} else {
  bot.player.setRepeatMode(msg.guild.id, false)
  let song = await bot.player.nowPlaying(msg.guild.id)
 msg.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.repeat} | 我將會停止重複播放 ${song.name}!` }})
  bot.player.loop = false;
}
}
module.exports.config = {
  name: "loop",
  aliases: ['repeat']
}