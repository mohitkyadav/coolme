const Discord = require('discord.js');
const axios = require('axios');

const enhanceChat = require('./utils/enhanceChat');
const helpText = 'Try *!cool coolmyname*, for all commands click [here](https://git.io/fpFgn).'

require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

client.on('message', message => {
  if (message.content === '!help') {
		message.reply(enhanceChat.embedStatic(helpText));
	} else if (message.content === '!hello') {
		message.reply(enhanceChat.embedStatic('world! ha ha gotcha 😎'));
	} else if (message.content === '!yo') {
		message.reply('lo! 😜');
	} else if (
		message.content === 'what is my avatar' ||
		message.content === 'what\'s my avatar' ||
		message.content === 'how do i look') {
    message.reply('Great! 👌 ' + message.author.avatarURL);
  } else if (message.content.startsWith('!cool')) {
		const args = (message.content.split('!cool').pop()).trim();
		if(args.length >= 1) {
			axios.get(`https://cool-name-api.glitch.me/coolify?name=${args}/`).then(response => {
				const coolNames = enhanceChat.jsonToTable(response.data);
				message.reply(enhanceChat.embedStatic(coolNames, '', '#00b8d4'));	
			}).catch(err => console.log(err.response));
		} else {
			message.reply('Expected at least 1 param after !cool. i.e   **!cool text text text....**');
		}
	}
});

// only cause deployment process doesn't stuck... 😒
require('http').createServer().listen(3000);
