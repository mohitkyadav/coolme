const axios = require('axios');

const enhanceChat = require('./enhanceChat');

ytHelper = {};

ytHelper.trending = async function(message, YTKEY) {
	message.channel.send(enhanceChat.embedStatic(
		"Fetching top 5 trending videos on YouTube",
		"Trending on YouTube",
		"#bf0000"
	));
	await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=NZ&maxResults=25&key=${YTKEY}`).then(res => {
		const trendingVideos = enhanceChat.embedTrendingVideos(res.data.items);
		for (let i = 0; i < trendingVideos.length; i++) {
			message.channel.send(trendingVideos[i]);
		}
	}).catch(err => {
		console.log(err);
		message.channel.send(enhanceChat.embedStatic(
			'Something went wrong, ❌',
			':/ ',
			'#bf0000',
		));
	});
}

module.exports = ytHelper;
