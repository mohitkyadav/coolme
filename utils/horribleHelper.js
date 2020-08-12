const axios = require('axios');
require('dotenv').config();

const enhanceChat = require('./enhanceChat');

const horribleHelper = {};

const { HORRIBLE_URI } = process.env

horribleHelper.magnet = async function(args, message) {
  await axios
    .get(`${HORRIBLE_URI}/${args}`)
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
