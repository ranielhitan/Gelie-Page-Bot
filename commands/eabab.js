const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'eabab',
  description: 'Generate Random Video.',
  usage: 'eabab',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    try {
      const { data } = await axios.get(`https://hiroshi-api.onrender.com/video/eabab`);
      const link = data[0]?.link;

      sendMessage(senderId, link ? {
        attachment: { type: 'video', payload: { url: link, is_reusable: true } }
      } : { text: 'Sorry, no Video link found for that query.' }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};