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

module.exports = enhanceChat;
