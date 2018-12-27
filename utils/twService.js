const enhanceChat = require('./enhanceChat');

twHelper = {};

twHelper.trending = async function(message) {
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

module.exports = twHelper;
