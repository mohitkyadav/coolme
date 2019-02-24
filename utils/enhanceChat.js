const { Client, RichEmbed } = require('discord.js');

enhanceChat = {};

enhanceChat.jsonToTable = function (json) {

  let msg = '';
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      // TODO: That's a jugad 😉,
      // TODO: find out why there's '/' in response
      msg += '**' + json[key].slice(0, -1) + '**\n\n';
    }
  }
  return msg;
}

enhanceChat.jsonToList = function (json) {
	let list = '';
	json.forEach(element => {
		list += element;
		list += '\n';
	});
	return list;
}

enhanceChat.embedStatic = function (
  msg='Something\'s not alright. :/',
  title='',
  color='#7c4dff',
  image = '',
  url='') {
  const embed = new RichEmbed()
    .setTitle(title)
    .setColor(color)
    .setDescription(msg)
    .setURL(url)
    .setImage(image);
  return embed;
}

enhanceChat.embedWeather = function (data) {

	const cityName = data['name'];
	const thumbnail = data['weather'][0]['icon'];
	const fields = [
		{
			'name': 'Temperature',
			'value' : data['main']['temp'] + '° C',
			'inline': true
		},
		{
			'name': 'Conditions',
			'value': data['weather'][0]['main'],
			'inline': true
		},
		{
			'name': 'Humidity',
			'value': data['main']['humidity'] + '%',
			'inline': true
		},
		{
			'name': 'Pressure',
			'value': data['main']['pressure'] + ' mb',
			'inline': true
		},
		{
			'name': 'Longitude',
			'value': data['coord']['lon'] + '° N',
			'inline': true
		},
		{
			'name': 'Latitude ',
			'value': data['coord']['lat'] + '° E',
			'inline': true
		}
	]
	const color = '#00ec3c';

  let embed = new RichEmbed()
    .setTitle(`Weather in ${cityName}`)
    .setColor(color)
		.setThumbnail(`http://openweathermap.org/img/w/${thumbnail}.png`);

	for (let i = 0; i < fields.length; i++) {
		embed.addField(fields[i]['name'], fields[i]['value'], fields[i]['inline']);
	}
  return embed;
}

enhanceChat.embedHelp = function() {
	let embed = new RichEmbed()
		.setTitle(`Coolme bot - Commands list`)
		.setColor(`#ffff00`)
		.setURL(`https://git.io/fpFgn`)
		.setFooter(`For more commands click go to https://git.io/fpFgn`)
		.addField('😎 Coolify text and nickames', '`!cool string`', false)
		.addField('😶 Uncoolify cool text', '`!uncool string`', false)
		.addField('☁ Weather', '`!weather city`', false)
		.addField('🎌 Trending on MASTERANIME', '`!mat`', false)
		.addField('🐤 Trending on Twitter', '`!twt`', false)
		.addField('🐱‍ Trending on GitHub', '`!ght`', false)
		.addField('📺 Trending on YouTube', '`!ytt`', false)
		.addField('🎴 Get a GitHub Card', '`!gcard username`', false);

	return embed;
}

enhanceChat.embedTrendingAnime = function(popular_today) {
	let trendingAnime = [];
	for (let i = 0; i < 5; i++) {
		let embed = new RichEmbed()
			.setTitle(`${popular_today[i].title}`)
			.setDescription(`Views - **${popular_today[i].total}**`)
			.setColor('#e50914')
			.setThumbnail(`https://cdn.masterani.me/poster/1/${popular_today[i].poster}`)
			.addField('Watch it now on', `[MASTERANIME](https://www.masterani.me/anime/info/${popular_today[i].slug})`);
			trendingAnime.push(embed);
	}
	return trendingAnime;
}

enhanceChat.embedTrendingRepos = function (repos) {
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
}

enhanceChat.embedCard = function (user, contri_data) {
	let d = new Date(user.created_at);
	let card = new RichEmbed()
		.setTitle(user.login)
		.setURL(user.html_url)
		.setColor('#e50914')
		.setThumbnail(user.avatar_url)
		.setFooter(`On GitHub since ${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`);

	if(user.name) {
		let fieldTitle = 'Name';
		user.type == 'Organization' ? fieldTitle = 'Organization Name' : fieldTitle = 'Name';
		card.addField(fieldTitle, user.name, true)
	}
	if(user.bio) {
		card.addField('Bio', user.bio, true);
	}
	if(user.company) {
		let orgs = (user.company.trim().split(' '));
		final = ''
		orgs.forEach(elem => {
			final += `[${elem}](https://github.com/${elem.substring(1, elem.length)}) `;
		});
		// console.log(final)
		card.addField('Organizations', final, false);
	}
	card.addField('Public Repos', user.public_repos, true);
	card.addField('Public Gists', user.public_gists, true);
	card.addField('Followers', user.followers, true);
	card.addField('Following', user.following, true);
	if(user.location) {
		card.addField('Location', user.location, false);
	}
	if(user.blog) {
		card.addField('Site', user.blog, false);
	}
	if(user.type == 'User') {
		fieldTitle = 'Contributions Today'
		var today = new Date();
		var date = today.getDate();
		var m = today.getMonth() + 1;
		var y = today.getFullYear();
		contri_data['data'][y][m][date] ? count = contri_data['data'][y][m][date] : count = 'Not available for today'
		card.addField(fieldTitle, count, true)
	}
	if(user.email) {
		card.addField('email', user.email, false);
	}
	return card;
}

enhanceChat.embedTrendingVideos = function (items) {

	let trendingVideos = [];
	for (let i = 0; i < 5; i++) {
		trendingVideos.push(`https://www.youtube.com/watch?v=${items[i].id}`);
	}

	return trendingVideos;
}

enhanceChat.embedTrendingTags = function (data) {
	let embeddedMessage = new RichEmbed()
		.setTitle(`⚡ Trending ${data.locations[0].name}`)
		.setThumbnail(`https://logo.clearbit.com/twitter.com`)
		.setColor('#1da1f2');

	let fieldsCount = 0
	while (embeddedMessage.fields.length < 10) {
		if (data.trends[fieldsCount].promoted_content || !data.trends[fieldsCount].tweet_volume) {
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
}

module.exports = enhanceChat;
