const cloudscraper = require('cloudscraper');

const enhanceChat = require('./enhanceChat');
const BASE_URL = 'https://www.masterani.me/';
const API_BASE_URL = BASE_URL + 'api/';

maHelper = {};
uriHelper = {};

uriHelper.getTrending = function() {
	return `${API_BASE_URL}anime/trending`;
}

maHelper.trending = async function(message) {
	await cloudscraper.get(uriHelper.getTrending(), function(error, response, body) {
		if (error) {
			console.log('Error occurred');
			message.channel.send(enhanceChat.embedStatic(
				'Something went wrong, ❌',
				':/ ',
				'#bf0000',
			));
		} else {
			let res = JSON.parse(body);
			const trendingAnime = enhanceChat.embedTrendingAnime(res.popular_today);
			for (let i = 0; i < trendingAnime.length; i++) {
				message.channel.send(trendingAnime[i]);
			}
		}
	});
}

module.exports = maHelper, uriHelper;
