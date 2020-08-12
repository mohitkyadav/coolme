const axios = require('axios');
require('dotenv').config();

const enhanceChat = require('./enhanceChat');

const horribleHelper = {};

const API_HOST = process.env.RATHI_API_HOST

horribleHelper.magnet = async function(args, message) {
  await axios
    .get(`${API_HOST}/horrible/${959}`)
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
