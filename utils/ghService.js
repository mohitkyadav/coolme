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
	let contributions;
	const ghUser = await axios
		.get(`https://api.github.com/users/${username}`)
		.then(res => res.data);
	if (ghUser.type === 'User') {
		contributions = await axios
			.get(`https://github-contributions-api.herokuapp.com/${username}/count`)
			.then(res => res.data)
			.catch(err => console.error(err));
	}
	message.channel.send(enhanceChat.embedCard(ghUser, contributions));
};

module.exports = ghHelper;
