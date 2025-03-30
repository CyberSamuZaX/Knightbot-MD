const axios = require('axios');
module.exports = async function (sock, chatId) {
    try {
        // Using the Hiru news API you provided
        const response = await axios.get('https://malaka-md-api-bot.vercel.app/news/hiru');
        
        // Get top 5 articles (assuming the API returns an array of articles)
        const articles = response.data.slice(0, 5);
        
        // Create news message
        let newsMessage = '📰 *නවතම පුවත්*:\n\n';
        
        // Format each article (adjusting based on the expected API response structure)
        articles.forEach((article, index) => {
            // Assuming the API returns objects with title and description properties
            // You may need to adjust these property names based on the actual API response
            newsMessage += `${index + 1}. ${article.title || article.headline || ''}\n${article.description || article.content || ''}\n\n`;
        });
        
        // Send the message to WhatsApp
        await sock.sendMessage(chatId, { text: newsMessage });
    } catch (error) {
        console.error('පුවත් ලබා ගැනීමේ දෝෂයක්:', error);
        await sock.sendMessage(chatId, { text: 'සමාවන්න, මට දැන් පුවත් ලබා ගත නොහැක.' });
    }
};
