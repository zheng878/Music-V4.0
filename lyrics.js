const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const geniusLyricsAPI = "eDD0sUPlpQzIRdrazmLUbv2yMWP931To6LelARvR-nnN60X7FVLzcNPrTh-aAfWN"

module.exports.run = async (bot, message, args) => {
  let playing = bot.player.isPlaying(message.guild.id)
  let songName = args.join(' ') 
  if (!songName && playing) songName = await bot.player.nowPlaying(message.guild.id).name;
    if (songName == '' && !playing)
      return message.channel.send(
        '目前沒有播放中的歌曲,請重試或者輸入您想要查詢的歌曲名稱'
      );
    
    const sentMessage = await message.channel.send(
      '👀 正在搜尋歌詞 👀'
    );

    // get song id
    var url = `https://api.genius.com/search?q=${encodeURI(songName)}`;

    const headers = {
      Authorization: `Bearer ${geniusLyricsAPI}`
    };
    try {
      var body = await fetch(url, { headers });
      var result = await body.json();
      console.log(result)
      const songID = result.response.hits[0].result.id;

      // get lyrics
      url = `https://api.genius.com/songs/${songID}`;
      body = await fetch(url, { headers });
      result = await body.json();

      const song = result.response.song;

      let lyrics = await getLyrics(song.url);
      lyrics = lyrics.replace(/(\[.+\])/g, '');

      if (lyrics.length > 4095)
        return message.say('歌詞過長,無法發送');
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor('#00724E')
          .setDescription(lyrics.trim());
        return sentMessage.edit('', lyricsEmbed);
      } else {
        // lyrics.length > 2048
        const firstLyricsEmbed = new MessageEmbed()
          .setColor('#00724E')
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed = new MessageEmbed()
          .setColor('#00724E')
          .setDescription(lyrics.slice(2048, lyrics.length));
        sentMessage.edit('', firstLyricsEmbed);
        message.channel.send(secondLyricsEmbed);
        return;
      }
    } catch (e) {
      console.error(e);
      return sentMessage.edit(
        '發生錯誤,請重試一次,或者輸入更具體一點的'
      );
    }
    async function getLyrics(url) {
      const response = await fetch(url);
      const text = await response.text();
      const $ = cheerio.load(text);
      return $('.lyrics')
        .text()
        .trim();
    }
  }
module.exports.config = {
  name: "lyrics",
  aliases: ['l']
}