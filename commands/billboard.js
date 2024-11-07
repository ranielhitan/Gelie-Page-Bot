
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'billboard',
  description: 'billboard content',
  usage: 'billboard [prompt]',
  author: 'Raniel',

  async execute(message, args) {
    const prompt = args.join(' ');
    if (!prompt) {
      return sendMessage(message.channel, 'Fucking idiot, you need to provide a prompt!');
    }

    try {
      const response = await axios.get(`https://api-canvass.vercel.app/billboard?text=kupal+kaba${encodeURIComponent(prompt)}`);
      const imageUrl = response.data.url; // Assuming the API returns an object with a 'url' property

      if (imageUrl) {
        return sendMessage(message.channel, `Here's your damn billboard, bitch: ${imageUrl}`);
      } else {
        return sendMessage(message.channel, 'Shit, something went wrong. Fucking API screwed up.');
      }
    } catch (error) {
      console.error('Fuck, an error occurred:', error);
      return sendMessage(message.channel, 'Fuck, something went wrong. Try again, dumbass.');
    }
  }
};
