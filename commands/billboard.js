 const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'billboard', 
  description: 'generates a billboard image based on a prompt',
  usage: 'lexi [prompt]', 
  author: 'Gelie', 
  
  async execute(senderId, args, pageAccessToken) {
 
    if (!args || args.length === 0) {
      
      await sendMessage(senderId, {
        text: 'you need to provide prompt stupid idiot.'
      }, pageAccessToken);
      return; 
    }

    
    const prompt = args.join(' ');
    const apiUrl = `https://api-canvass.vercel.app/phub?text=Blurd+shit&name=Mark+Zuckerberg&id=4${encodeURIComponent(prompt)}`; 
    
    
    await sendMessage(senderId, { text: '⌛Sending your damn image, bitch...' }, pageAccessToken);

    try {
     
      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: {
            url: apiUrl 
          }
        }
      }, pageAccessToken);

    } catch (error) {
     
      console.error('Shit, something went wrong. Fucking API screwed up.', error);
      
      await sendMessage(senderId, {
        text: 'An error occurred while generating the image. Please try again later.'
      }, pageAccessToken);
    }
  }
};
