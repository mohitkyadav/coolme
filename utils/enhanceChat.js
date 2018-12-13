enhanceChat = {};

enhanceChat.jsonToTable = function (json) {
  // console.log(json);
  let msg = '';
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      // console.log(key + ": " + json[key]);
      msg += '**' + json[key].slice(0, -1) + '**\n\n';
    }
  }
  return msg;
}

module.exports = enhanceChat;
