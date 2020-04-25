module.exports.run = async (bot, msg, args) => {
  if (!msg.member.voice.channel)
    return msg.channel.send({
      embed: {
        color: bot.colors.error,
        description: `${bot.emotes.errors} | 你必須要在語音頻道裡面!`
      }
    });
  if (!bot.player.isPlaying(msg.guild.id))
    return msg.channel.send({
      embed: {
        color: bot.colors.error,
        description: `${bot.emotes.errors} | 目前沒有播放中的歌曲!`
      }
    });
  let queue = await bot.player.getQueue(msg.guild.id);
       let aa = queue.songs.map((song, i) => {
            return `${i === 0 ? '正在播放' : `#${i+1}`} - ${song.name} | ${song.author}`
        }).join('\n')
  msg.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.success} | 隊列\n${aa}` }});
}
module.exports.config = {
  name: "queue",
  aliases: ["q"]
};
