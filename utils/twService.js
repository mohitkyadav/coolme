const Twit = require('twit');
require('dotenv').config();

const enhanceChat = require('./enhanceChat');

twHelper = {};

var T = new Twit({
  consumer_key: process.env.TWAPIKEY,
	consumer_secret: process.env.TWAPISECRET,
	access_token: process.env.TWACCESS,
  access_token_secret: process.env.TWACCESSSECRET,
  timeout_ms: 60*1000,  // optional secrete HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
})

twHelper.trending = async function(message) {
	await T.get('trends/place', { id: 1 }, function (err, data, response) {
		if (err) {
			console.log('Error occurred');
			message.channel.send(enhanceChat.embedStatic(
				'Something went wrong, ❌',
				':/ ',
				'#bf0000',
			));
		} else {
			let res = data[0];
			const trendingTags = enhanceChat.embedTrendingTags(res);
			message.channel.send(trendingTags);
		}
	});
}

module.exports = twHelper;
