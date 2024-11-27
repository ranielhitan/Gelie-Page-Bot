const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'blackbox',
  description: 'Interact with Blackbox GPT-4o',
  usage: 'blackbox [your message]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: blackbox <question>" }, pageAccessToken);

    try {
      const { data: { result } } = await axios.get(`https://api.kenliejugarap.com/blackbox-gpt4o/?text=${encodeURIComponent(prompt)}&uid=${senderId}`);
      sendMessage(senderId, { text: result }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
