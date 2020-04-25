module.exports.config = {
  name: "play",
  aliases: ['p']
}
module.exports.run = async (bot, msg, args) => {
  let toplay = args.join(" ");
  if (!toplay) return msg.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.errors} | 用法: 8!play <歌名/url>` }})
  let isPlaying = bot.player.isPlaying(msg.guild.id)
  if (isPlaying) {
    let song = await bot.player.addToQueue(msg.guild.id, toplay)
    msg.channel.send(`${song.name} 被加入了隊列!`);
  } else {
      let song = await bot.player.play(msg.member.voice.channel, toplay);
      msg.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.music} | 現在播放:\n${song.name}` }}).catch(() => {
            msg.channel.send(`找不到${toplay}的歌曲`);
        });
    song.queue.on('end', () => {
      msg.channel.send({embed: {color: bot.colors.warning, description: `${bot.emotes.warning} | 隊列已無歌曲!` }})
    });

    song.queue.on('songChanged', (oldSong, newSong, skipped, repeatMode) => {
        if(repeatMode){
            msg.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.repeat} | 重複播放:\n ${oldSong.name}` }})
        } else {
            msg.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.music} | 目前播放:\n ${newSong.name}` }})
        }
    });
  }
}