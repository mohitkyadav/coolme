const axios = require('axios');

coolify = {};

coolify.getCoolName = function(name) {
	if(typeof(name) == 'string') {
		axios.get(`https://cool-name-api.glitch.me/coolify?name=${name}/`).then(response => {
      console.log(response.data);
      return response.data
    }).catch(err => console.log(err.response));
	} else {
		return false;
	}
};

module.exports = coolify;
