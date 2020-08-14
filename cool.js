const Discord = require('discord.js');
const axios = require('axios');
const dns = require('dns');

require('dotenv').config();

// ☠😢 ma is dead
// const maService = require('./utils/maService');
const twHelper = require('./utils/twService');
const ghHelper = require('./utils/ghService');
const horribleHelper = require('./utils/horribleHelper');
const ytHelper = require('./utils/ytService');
const enhanceChat = require('./utils/enhanceChat');

const OWKEY = process.env.OWAPI;
const YTKEY = process.env.YTKEY;

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'bots');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(
    `${member} just arrived from the future, welcome! 🙏 type \`!help\` to get started.`
  );
});

client.on('message', message => {
  if (message.content === '!help') {
    message.channel.send(enhanceChat.embedHelp());
  } else if (message.content === '!hello') {
    message.channel.send(enhanceChat.embedStatic('world! 😎'));
  } else if (message.content === '!yo') {
    message.channel.send('lo! 😜');
  } else if (
    message.content === 'what is my avatar' ||
    message.content === "what's my avatar" ||
    message.content === 'my avatar' ||
    message.content === 'how do i look'
  ) {
    message.reply(
      enhanceChat.embedStatic(
        'Your avatar ',
        'Great! 👌 ',
        '#00b8d4',
        message.author.avatarURL
      )
    );
  } else if (message.content.startsWith('!cool')) {
    const args = message.content
      .split('!cool')
      .pop()
      .trim();
    if (args.length) {
      axios
        .get(`https://cool-name-api.glitch.me/coolify?name=${args}/`)
        .then(response => {
          const coolNames = enhanceChat.jsonToTable(response.data);
          message.reply(enhanceChat.embedStatic(coolNames, '', '#00b8d4'));
        })
        .catch(err => console.log(err.response));
    } else {
      message.reply(
        enhanceChat.embedStatic(
          'Expected at least 1 param after !cool. i.e   **!cool text text text....**',
          'Error',
          '#FF6347',
          '',
          'https://git.io/fpFgn'
        )
      );
    }
  } else if (message.content.startsWith('!uncool')) {
    const args = message.content
      .split('!uncool')
      .pop()
      .trim();
    if (args.length) {
      axios
        .get(`https://cool-name-api.glitch.me/uncoolify?name=${args}/`)
        .then(response => {
          // TODO: That's a jugad, find out why there's forward '/' in response
          const uncoolNames = response.data['uncool_name'][0].slice(0, -1);
          // console.log(response.data['uncool_name'][0]);
          message.reply(enhanceChat.embedStatic(uncoolNames, '', '#00b8d4'));
        })
        .catch(err => console.log(err.response));
    } else {
      message.reply(
        'Expected at least 1 param after !uncool. i.e   **!uncool t3xt t3xt text....**'
      );
    }
  } else if (message.content.startsWith('!status')) {
    axios
      .get('https://cool-name-api.glitch.me/coolify?name=only4/')
      .then(response => {
        message.channel.send(
          enhanceChat.embedStatic(
            'cool-name-api working, status 200 ✅',
            'Status 200',
            '#00ec3c'
          )
        );
      })
      .catch(err => {
        console.log(err.response);
        message.channel.send(
          enhanceChat.embedStatic(
            'cool-name-api not working, ❌',
            'Status ' + err.response.status,
            '#bf0000'
          )
        );
      });
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=delhi&APPID=${OWKEY}&units=metric`
      )
      .then(response => {
        message.channel.send(
          enhanceChat.embedStatic(
            'Open-Weather API working, status 200 ✅',
            'Status 200',
            '#00ec3c'
          )
        );
      })
      .catch(err => {
        console.log(err.response);
        message.channel.send(
          enhanceChat.embedStatic(
            'Open-Weather API not working, ❌',
            'Status ' + err.response.status,
            '#bf0000'
          )
        );
      });
  } else if (message.content.startsWith('!ip')) {
    let args = message.content
      .split('!ip')
      .pop()
      .trim();

    if (args.startsWith('https://')) {
      args = args
        .split('https://')
        .pop()
        .trim();
    } else if (args.startsWith('http://')) {
      args = args
        .split('http://')
        .pop()
        .trim();
    }

    if (args.endsWith('/')) {
      args = args.substring(0, args.length - 1);
    }

    if (args.length) {
      dns.resolve4(args, function(err, addresses) {
        if (err) {
          message.reply(
            enhanceChat.embedStatic(
              'Check your url, maybe you are doing it wrong way',
              'Nothing found',
              '#ae0000'
            )
          );
        } else {
          message.reply(
            enhanceChat.embedStatic(
              enhanceChat.jsonToList(addresses),
              "Here's the ip address",
              '#00ec3c',
              ''
            )
          );
        }
      });
    } else {
      message.reply(
        enhanceChat.embedStatic(
          'Also enter url after !ip. i.e   **!ip url**',
          'Error',
          '#FF6347',
          '',
          'https://git.io/fpFgn'
        )
      );
    }
  } else if (message.content.startsWith('!weather')) {
    const args = message.content
      .split('!weather')
      .pop()
      .trim();
    if (args.length) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${args}&APPID=${OWKEY}&units=metric`
        )
        .then(response => {
          message.reply(enhanceChat.embedWeather(response.data));
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.status == 404) {
            message.reply(
              enhanceChat.embedStatic(
                `City named ${args}, not found`,
                'Oops...',
                '#ae0000'
              )
            );
          } else {
            message.reply(
              enhanceChat.embedStatic(
                'Something went wrong, please contact the dev',
                'Oops...',
                '#ae0000'
              )
            );
          }
        });
    } else {
      message.reply(
        enhanceChat.embedStatic(
          'Also enter location i.e **!weather Delhi**',
          'Error',
          '#FF6347',
          '',
          'https://git.io/fpFgn'
        )
      );
    }
  } else if (message.content.startsWith('!magnet')) {
    const args = message.content
      .split('!magnet')
      .pop()
      .trim();
    if (args.length) {
      horribleHelper.magnet(args, message);
    } else {
      message.reply(
        'use command `!help` to see the usage.'
      );
    }
  } else if (message.content.startsWith('!twt')) {
    twHelper.trending(message);
  } else if (
    message.content.startsWith('!ght') ||
    message.content.startsWith('!trending on gh')
  ) {
    ghHelper.trending(message);
  } else if (message.content.startsWith('!gcard')) {
    const args = message.content
      .split('!gcard')
      .pop()
      .trim();
    if (args.length) {
      ghHelper.getUserCard(args, message);
    } else {
      message.reply(
        'Expected username after !gcard. i.e   **!gcard mohitkyadav**'
      );
      ghHelper.getUserCard('mohitkyadav', message);
    }
  } else if (message.content.startsWith('!ytt')) {
    const args = message.content.split(' ');
    ytHelper.trending(message, YTKEY, args[1]);
  }
});

// only for the sake of deployment process... 😒
require('http')
  .createServer((_request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('kaha?');
    response.end();
  })
  .listen(process.env.PORT || 3000);
