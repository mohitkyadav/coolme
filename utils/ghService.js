const axios = require('axios');

const enhanceChat = require('./enhanceChat');

const ghHelper = {};

ghHelper.trending = async function(message) {
  await axios
    .get('https://github-trending-api.now.sh/repositories')
    .then(res => {
      console.log(res.data);
      message.channel.send(enhanceChat.embedTrendingRepos(res.data));
    })
    .catch(err => {
      console.log(err);
      message.channel.send(
        enhanceChat.embedStatic('Something went wrong, ❌', ':/ ', '#bf0000')
      );
    });
};

ghHelper.getUserCard = async (username, message) => {
  axios
  .get(`https://api.github.com/users/${username}`).then((ghUser) => {
      message.channel.send(enhanceChat.embedCard(ghUser.data));
    });
};

module.exports = ghHelper;
