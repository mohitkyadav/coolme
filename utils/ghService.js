const axios = require('axios');

const enhanceChat = require('./enhanceChat');

ghHelper = {};

ghHelper.trending = async function(message) {
	await axios.get('https://github-trending-api.now.sh/repositories').then(res => {
		console.log(res.data);
		message.channel.send(enhanceChat.embedTrendingRepos(res.data));
	}).catch(err => {
		console.log(err);
		message.channel.send(enhanceChat.embedStatic(
			'Something went wrong, ❌',
			':/ ',
			'#bf0000',
		));
	});
}

ghHelper.getUserCard = async function(username, message) {
	await axios.get(`https://api.github.com/users/${username}`).then(response => {
		message.channel.send(enhanceChat.embedCard(response.data));
	}).catch(err => console.log(err));
}

module.exports = ghHelper;
