var Discord = require('discord.io');
var logger = require('winston');
var axios = require('axios');

const enhanceChat = require('./utils/enhanceChat');
const helpText = 'try *!cool coolmyname*, for all commands click [here](https://github.com/mohitkyadav/coolme#list-of-supported-commands).'

require('dotenv').config();

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

const bot = new Discord.Client({
	token: process.env.TOKEN,
	autorun: true
});

bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', async function (user, userID, channelID, message, evt) {

	if (message.substring(0, 1) == '!') {
		let args = message.substring(1).split(' ');
		const cmd = args[0];
    args = args.splice(1);
    switch (cmd) {
			case 'help':
				bot.sendMessage({
					to: channelID,
					message: helpText
				});
				break;
			case 'hello':
				bot.sendMessage({
					to: channelID,
					message: 'world!'
				});
				break;
			case 'yo':
				bot.sendMessage({
					to: channelID,
					message: 'lo! 😜'
				})
        break;
			case 'cool':
        await axios.get(`https://cool-name-api.glitch.me/coolify?name=${args[0]}/`).then(response => {
          // console.log(response.data);
          bot.sendMessage({
            to: channelID,
            message: enhanceChat.jsonToTable(response.data)
          })
        }).catch(err => console.log(err.response));
        break;
		}
	}
});

require('http').createServer().listen(3000);
