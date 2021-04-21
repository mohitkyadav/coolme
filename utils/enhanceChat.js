require('dotenv').config();
const Moment = require('moment');

const { RichEmbed } = require('discord.js');
const { MAGNET_URI, MAG_GIF } = process.env

enhanceChat = {};

enhanceChat.jsonToTable = json => {
  let msg = '';
  Object.values(json).forEach(val => {
    msg += `**${val.slice(0, -1)}**\n\n`;
  });
  return msg;
};

enhanceChat.jsonToList = json => json.join('\n');

enhanceChat.embedStatic = function (
  msg = "Something's not alright. :/",
  title = '',
  color = '#7c4dff',
  image = '',
  url = ''
) {
  const embed = new RichEmbed()
    .setTitle(title)
    .setColor(color)
    .setDescription(msg)
    .setURL(url)
    .setImage(image);
  return embed;
};

enhanceChat.embedWeather = function (data) {
  const cityName = data['name'];
  const thumbnail = data['weather'][0]['icon'];
  const fields = [
    {
      name: 'Temperature',
      value: data['main']['temp'] + '° C',
      inline: true
    },
    {
      name: 'Conditions',
      value: data['weather'][0]['main'],
      inline: true
    },
    {
      name: 'Humidity',
      value: data['main']['humidity'] + '%',
      inline: true
    },
    {
      name: 'Pressure',
      value: data['main']['pressure'] + ' mb',
      inline: true
    },
    {
      name: 'Longitude',
      value: data['coord']['lon'] + '° N',
      inline: true
    },
    {
      name: 'Latitude ',
      value: data['coord']['lat'] + '° E',
      inline: true
    }
  ];
  const color = '#00ec3c';

  let embed = new RichEmbed()
    .setTitle(`Weather in ${cityName}`)
    .setColor(color)
    .setThumbnail(`http://openweathermap.org/img/w/${thumbnail}.png`);

  for (let i = 0; i < fields.length; i++) {
    embed.addField(fields[i]['name'], fields[i]['value'], fields[i]['inline']);
  }
  return embed;
};

enhanceChat.embedHelp = function () {
  let embed = new RichEmbed()
    .setTitle(`Coolme bot - Commands list`)
    .setColor(`#ffff00`)
    .setURL(`https://git.io/fpFgn`)
    .setFooter(`For more commands click go to https://git.io/fpFgn`)
    .addField('😎 Coolify text and nickames', '`!cool string`', false)
    .addField('😶 Uncoolify cool text', '`!uncool string`', false)
    .addField('☁ Weather', '`!weather city`', false)
    .addField('🐤 Trending on Twitter', '`!twt`', false)
    .addField('📺 Trending on YouTube', '`!ytt`', false)
    .addField('🎴 Get a GitHub Card', '`!gcard username`', false);

  return embed;
};

enhanceChat.embedTrendingAnime = popular_today => {
  let trendingAnime = [];
  for (let i = 0; i < 5; i++) {
    let embed = new RichEmbed()
      .setTitle(`${popular_today[i].title}`)
      .setDescription(`Views - **${popular_today[i].total}**`)
      .setColor('#e50914')
      .setThumbnail(
        `https://cdn.masterani.me/poster/1/${popular_today[i].poster}`
      )
      .addField(
        'Watch it now on',
        `[MASTERANIME](https://www.masterani.me/anime/info/${popular_today[i].slug})`
      );
    trendingAnime.push(embed);
  }
  return trendingAnime;
};

enhanceChat.embedTrendingRepos = repos => {
  let trendingRepos = new RichEmbed()
    .setTitle('⚡ Trending on GitHub')
    .setDescription('Showing the top 10 trending repositories on GitHub')
    .setURL('https://github.com/trending/')
    .setColor('#80ff00')
    .setThumbnail('https://logo.clearbit.com/githubuniverse.com');

  for (let i = 0; i < Math.min(10, repos.length); i++) {
    trendingRepos.addField(
      `${repos[i].author}/${repos[i].name}`,
      `${repos[i].language} - ${repos[i].stars} ⭐ - ${repos[i].forks} forks - [↗](${repos[i].url})`,
      false
    );
  }
  return trendingRepos;
};

enhanceChat.embedCard = (user) => {
  let d = new Date(user.created_at);
  let card = new RichEmbed()
    .setTitle(user.login)
    .setURL(user.html_url)
    .setColor('#e50914')
    .setThumbnail(user.avatar_url)
    .setFooter(
      `On GitHub since ${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
    );

  if (user.name) {
    let fieldTitle = user.type === 'Organization' ? 'Organization ' : '';
    fieldTitle += 'Name';
    card.addField(fieldTitle, user.name, true);
  }
  if (user.bio) {
    card.addField('Bio', user.bio, true);
  }
  if (user.company) {
    const orgs = user.company.trim().split(' ');
    let companyString = '';
    orgs.forEach(ele => {
      companyString += `[${ele}](https://github.com/${ele.substring(1)}) `;
    });
    card.addField('Organizations', companyString, false);
  }
  card.addField('Public Repos', user.public_repos, true);
  card.addField('Public Gists', user.public_gists, true);
  card.addField('Followers', user.followers, true);
  card.addField('Following', user.following, true);
  if (user.location) {
    card.addField('Location', user.location, false);
  }
  if (user.blog) {
    const reg = /^((http|https):\/\/)/;
    let url = user.blog;
    if (!reg.test(user.blog)) {
      url = 'https://' + user.blog;
    }
    const site = `[${user.blog}](${url})`;
    card.addField('Site', site, false);
  }
  if (user.email) {
    card.addField('Email', user.email, false);
  }
  return card;
};

enhanceChat.embedTrendingVideos = items => {
  let trendingVideos = [];
  for (let i = 0; i < 5; i++) {
    trendingVideos.push(`https://www.youtube.com/watch?v=${items[i].id}`);
  }

  return trendingVideos;
};

enhanceChat.embedTrendingTags = function (data) {
  let embeddedMessage = new RichEmbed()
    .setTitle(`⚡ Trending ${data.locations[0].name}`)
    .setThumbnail(`https://logo.clearbit.com/twitter.com`)
    .setColor('#1da1f2');

  let fieldsCount = 0;
  while (embeddedMessage.fields.length < 10) {
    if (
      data.trends[fieldsCount].promoted_content ||
      !data.trends[fieldsCount].tweet_volume
    ) {
      fieldsCount++;
      continue;
    } else {
      embeddedMessage.addField(
        data.trends[fieldsCount].name,
        `${data.trends[fieldsCount].tweet_volume} - [Tweets](${data.trends[fieldsCount].url})`,
        false
      );
      fieldsCount++;
    }
  }
  return embeddedMessage;
};

enhanceChat.embedAnimeSuggestions = (data) => {
  let description = ''
  if (data.suggestion && data.suggestion.length > 0) {
    data.suggestion.forEach((suggestion, index) => {
      description += `**${index + 1}**. ${suggestion} \n\n`
    })
  }

  if (data.suggestion && data.suggestion.length === 0) {
    return new RichEmbed()
      .setTitle('Are you speaking alien? Try something human.')
      .setThumbnail(data.poster || MAG_GIF)
      .setDescription('Go check your anime name baka! 😒')
      .setColor('#CA2424');
  }

  return new RichEmbed()
    .setTitle(data.message)
    .setThumbnail(data.poster || MAG_GIF)
    .setDescription(description)
    .setColor('#FFDC5D');
}

enhanceChat.embedMagnets = (data) => {
  console.log(data)
  if (data.error) {
    return enhanceChat.embedStatic(data.error, 'Error attracting magnets', '#E53232');
  }

  if (data.suggestion) {
    return enhanceChat.embedAnimeSuggestions(data);
  }

  const qualities = { SD: '📱', HD: '📺', UHD: '💻' }
  const description = Object.keys(qualities)
                      .map(quality => `[${quality} ${qualities[quality]}](${MAGNET_URI}/${data[quality]})`).join(' 🖇 ');

  const date = new Moment(data.date, 'MM/DD/YYY').format('DD MMM YYYY')
  const embeddedMessage = new RichEmbed()
    .setTitle(`${data.animeName} | Episode ${data.episode} 📺`)
    .setThumbnail(data.poster || MAG_GIF)
    .setDescription(description)
    .setFooter(`⌚ Aired ${date === 'Invalid date' ? data.date : date}`)
    .setColor('#43B581');
  return embeddedMessage;
};

module.exports = enhanceChat;
