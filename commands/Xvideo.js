const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'xvideo',
  description: 'search and play videos.',
  usage: 'video [video name]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    if (!args || args.length === 0) {
      // Send message requesting a prompt if missing
      await sendMessage(senderId, {
        text: '❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝘆𝗼𝘂𝗿 𝗽𝗿𝗼𝗺𝗽𝘁\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲: Video Nang Dumating Ka.'
      }, pageAccessToken);
      return;  // Exit the function if no prompt is provided
    }

    try {
      const { data } = await axios.get(`https://josh-projects.vercel.app/xxx${encodeURIComponent(args.join(' '))}`);
      const link = data[0]?.download;

      sendMessage(senderId, link ? {
        attachment: { type: 'video', payload: { url: link, is_reusable: true } }
      } : { text: 'Sorry, no video link found for that query.' }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};