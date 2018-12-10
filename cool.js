var Discord = require('discord.io');
var logger = require('winston');

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

bot.on('message', function (user, userID, channelID, message, evt) {

	if (message.substring(0, 1) == '!') {
		let args = message.substring(1).split(' ');
		const cmd = args[0];

		args = args.splice(1);
		switch (cmd) {
			case 'hello':
				bot.sendMessage({
					to: channelID,
					message: 'world!'
				});
			break;
			case 'yo':
				bot.sendMessage({
					to:channelID,
					message: 'lo! 😜'
				})
			break;
		}
	}
});

require('http').createServer().listen(3000);
