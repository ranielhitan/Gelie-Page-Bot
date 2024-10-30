const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'wattpad',
  description: 'Search Wattpad Stories',
  usage: 'wattpad [story title]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    try {
      const { data: { result } } = await axios.get(`https://joshweb.click/api/wattpad?q=${encodeURIComponent(args.join(' '))}`);
      if (result?.lyrics) {
        const messages = splitMessage(result.title, result.vote, result.link, 2000);
        messages.forEach(message => sendMessage(senderId, { text: message }, pageAccessToken));
        if (result.thumbnail) sendMessage(senderId, { attachment: { type: 'image', payload: { url: result.thumbnail, is_reusable: true } } }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Sorry, no stories were found for your query.' }, pageAccessToken);
      }
    } catch {
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};

const splitMessage = (title, vote, link, chunkSize) => {
  const message = `Title: ${title}\nVote: ${vote}\n\n${link}`;
  return Array.from({ length: Math.ceil(message.length / chunkSize) }, (_, i) => message.slice(i * chunkSize, (i + 1) * chunkSize));
};
