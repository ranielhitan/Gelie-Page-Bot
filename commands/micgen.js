const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'micgen',
  description: 'Generate Microsoft Account',
  usage: 'micgen <name>',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {

    try {
      const apiUrl = 'https://joshweb.click/api/genmicro?name=${encodeURIComponent(prompt)}';
const response = await axios.get(apiUrl);
const user = response.data.result.email;
const pass = response.data.result.password;
//const username = response.data.username;
//const displayname = response.data.displayname;

       const mes = `Microsoft Account\nUsername: ${user}\nPassword: ${pass}`;
  await sendMessage(senderId, { text: mes }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
