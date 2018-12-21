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
    message.reply(enhanceChat.embedStatic('Your avatar', 'Great! 👌 ', '#00b8d4', message.author.avatarURL));

	} else if (message.content.startsWith('!cool')) {

		const args = (message.content.split('!cool').pop()).trim();
		if(args.length >= 1) {

			axios.get(`https://cool-name-api.glitch.me/coolify?name=${args}/`).then(response => {
				const coolNames = enhanceChat.jsonToTable(response.data);
				message.reply(enhanceChat.embedStatic(coolNames, '', '#00b8d4'));
			}).catch(err => console.log(err.response));

		} else {
			message.reply(enhanceChat.embedStatic(
				'Expected at least 1 param after !cool. i.e   **!cool text text text....**',
				'Error',
				'#FF6347',
				'',
        'https://git.io/fpFgn'
      ));
		}

	} else if (message.content.startsWith('!uncool')) {

		const args = (message.content.split('!uncool').pop()).trim();
		if(args.length >= 1) {

			axios.get(`https://cool-name-api.glitch.me/uncoolify?name=${args}/`).then(response => {
				// TODO: That's a jugad, find out why there's forward '/' in response
				const uncoolNames = (response.data['uncool_name'][0]).slice(0, -1);
				// console.log(response.data['uncool_name'][0]);
				message.reply(enhanceChat.embedStatic(uncoolNames, '', '#00b8d4'));
			}).catch(err => console.log(err.response));

		} else {
			message.reply('Expected at least 1 param after !uncool. i.e   **!uncool t3xt t3xt text....**');
		}

	} else if (message.content.startsWith('!status')) {
		axios.get('https://cool-name-api.glitch.me/coolify?name=only4/').then(response => {
			message.reply(enhanceChat.embedStatic(
				'cool-name-api working status 200 ✅',
				'Status 200',
				'#00ec3c',
			));
		}).catch(err => {
			console.log(err.response)
			message.reply(enhanceChat.embedStatic(
				'cool-name-api not working, ❌',
				'Status ' + err.response.status,
				'#bf0000',
			));
		});
	}
});

// only cause deployment process doesn't stuck... 😒
require('http').createServer().listen(3000);
