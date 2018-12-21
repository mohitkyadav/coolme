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

module.exports = enhanceChat;
