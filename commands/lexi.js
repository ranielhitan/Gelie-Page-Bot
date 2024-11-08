const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'lexi', 
  description: 'generates a lexi image based on a prompt',
  usage: 'lexi [prompt]', 
  author: 'Gelie', 
  
  async execute(senderId, args, pageAccessToken) {
 
    if (!args || args.length === 0) {
      
      await sendMessage(senderId, {
        text: 'you need to provide prompt'
      }, pageAccessToken);
      return; 
    }

    
    const prompt = args.join(' ');
    const apiUrl = `https://api-canvass.vercel.app/lexi?text=${encodeURIComponent(prompt)}`; 
    
    
    await sendMessage(senderId, { text: '⌛ 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗻𝗴 𝗶𝗺𝗮𝗴𝗲 𝗯𝗮𝘀𝗲𝗱 𝗼𝗻 𝘆𝗼𝘂𝗿 𝗽𝗿𝗼𝗺𝗽𝘁, 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...' }, pageAccessToken);

    try {
     
      await sendMessage(senderId, {
        attachment: {
          type: 'Heres your damn image, bitch',
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
