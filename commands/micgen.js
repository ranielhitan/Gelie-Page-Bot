const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'micgen',
  description: 'Generate Random Account on Microsoft',
  usage: 'micgen [name or text]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {

    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: micgen <name or text>" }, pageAccessToken);

    try {
      const { data: { result } } = await axios.get(`https://joshweb.click/api/genmicro?name=${encodeURIComponent(prompt)}`);
      sendMessage(`senderId, { text: result.email \nresult.password }, pageAccessToken`);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
