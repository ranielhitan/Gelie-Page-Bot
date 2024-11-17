const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'ph',
  description: 'Generate a hack meme',
  usage: 'hack <name> <uid>',
  author: 'Developer’s name',

  async execute(senderId, args, pageAccessToken) {
    if (!args || !Array.isArray(args) || args.length < 2) {
      await sendMessage(senderId, { text: 'ph (prompt).' }, pageAccessToken);
      return;
    }

    try {
      const apiUrl = `https://api-canvass.vercel.app/phub?text=Blurd+shit&name=Mark+Zuckerberg&id=4${encodeURIComponent}`;
      await sendMessage(senderId, { attachment: { type: 'image', payload: { url: apiUrl } } }, pageAccessToken);
    } catch (error) {
      await sendMessage(senderId, { text: 'Error: Could not generate hack meme.' }, pageAccessToken);
    }
  }
};