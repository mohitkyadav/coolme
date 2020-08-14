const axios = require('axios');
require('dotenv').config();

const enhanceChat = require('./enhanceChat');

const horribleHelper = {};

const { HORRIBLE_URI } = process.env

horribleHelper.magnet = function(args, message) {
  const [animeId, episode] = args.split(' ')
  const url = parseInt(episode, 10) > 0 ? `${HORRIBLE_URI}/${animeId}/${episode}` : `${HORRIBLE_URI}/${animeId}`

  axios
    .get(url)
    .then(res => {
      message.channel.send(enhanceChat.embedMagnets(res.data));
    })
    .catch(err => {
      console.log(err);
      message.channel.send(
        enhanceChat.embedStatic('Something went wrong, ❌', ':/ ', '#bf0000')
      );
    });
};

module.exports = horribleHelper;
