const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

// Define and export module
module.exports = {
  // Metadata for the command
  name: 'emojimix', // Command name
  description: 'mixes two emojis into one image.', // description 
  usage: 'emojimix <emoji1> <emoji2>', // usage
  author: 'Raniel', // Author of the command

  // Main function that executes the command
  async execute(senderId, args, pageAccessToken) {
    // Check if two emoji arguments are provided
    if (!args || args.length < 2) {
      // Send message requesting two emojis if missing
      await sendMessage(senderId, {
        text: '❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝘁𝘄𝗼 𝗲𝗺𝗼𝗷𝗶𝘀 𝘁𝗼 𝗺𝗶𝘅,\n\n 𝗘𝘅𝗮𝗺𝗽𝗹𝗲: 𝗲𝗺𝗼𝗷𝗶𝗺𝗶𝘅 😭 🤣'
      }, pageAccessToken);
      return; // Exit the function if emojis are missing
    }

    // Get the two emojis from arguments
    const [emoji1, emoji2] = args;
    const apiUrl = `https://betadash-uploader.vercel.app/emojimix?emoji1=${encodeURIComponent(emoji1)}&emoji2=${encodeURIComponent(emoji2)}`;

    // Notify user that the image is being generated
    await sendMessage(senderId, { text: '⌛ 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗻𝗴 𝗲𝗺𝗼𝗷𝗶𝗺𝗶𝘅 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁..' }, pageAccessToken);

    try {
      // Send the generated emoji mix to the user as an image attachment
      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: {
            url: apiUrl // URL of the generated emoji mix image
          }
        }
      }, pageAccessToken);

    } catch (error) {
      // Handle and log any errors during emoji mix generation
      console.error('Error generating emoji mix:', error);

      // Notify user of the error
      await sendMessage(senderId, {
        text: 'Oops! Something went wrong while generating the emoji mix.'
      }, pageAccessToken);
    }
  }
};