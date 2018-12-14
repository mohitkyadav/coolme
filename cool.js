const Discord = require('discord.js');
var axios = require('axios');

const client = new Discord.Client();

const enhanceChat = require('./utils/enhanceChat');
const helpText = 'try *!cool coolmyname*, for all commands click https://git.io/fpFgn .'

require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

client.on('guildMemberAdd', member => {
  channel.send(`Welcome to the server, ${member}`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
	} else if (msg.content === 'what is my avatar' ||
						 msg.content === 'what\'s my avatar' ||
						 msg.content === 'how do i look') {
    message.reply("Great 👌 " + message.author.avatarURL);
  }
});


// bot.on('message', async function (user, userID, channelID, message, evt) {

// 	if (message.substring(0, 1) == '!') {
// 		let args = message.substring(1).split(' ');
// 		const cmd = args[0];
//     args = args.splice(1);
//     switch (cmd) {
// 			case 'help':
// 				bot.sendMessage({
// 					to: channelID,
// 					message: helpText
// 				});
// 				break;
// 			case 'hello':
// 				bot.sendMessage({
// 					to: channelID,
// 					message: 'world!'
// 				});
// 				break;
// 			case 'yo':
// 				bot.sendMessage({
// 					to: channelID,
// 					message: 'lo! 😜'
// 				})
//         break;
// 			case 'cool':
//         await axios.get(`https://cool-name-api.glitch.me/coolify?name=${args[0]}/`).then(response => {
//           // console.log(response.data);
//           bot.sendMessage({
//             to: channelID,
//             message: enhanceChat.jsonToTable(response.data)
//           })
//         }).catch(err => console.log(err.response));
//         break;
// 		}
// 	}
// });

// only cause deployment process doesn't stuck... 😒
require('http').createServer().listen(3000);
