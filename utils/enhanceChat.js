const { Client, RichEmbed } = require('discord.js');

enhanceChat = {};

enhanceChat.jsonToTable = function (json) {
  // console.log(json);
  let msg = '';
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      // console.log(key + ": " + json[key]);
      msg += '**' + json[key].slice(0, -1) + '**\n\n';
    }
  }
  return msg;
}

enhanceChat.embedStatic = function (msg='Something\'s not alright. :/', title='', color='#7c4dff') {
  const embed = new RichEmbed()
    .setTitle(title)
    .setColor(color)
    .setDescription(msg);
  return embed;
}

module.exports = enhanceChat;
