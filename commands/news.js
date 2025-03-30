const axios = require('axios');

module.exports = async function (sock, chatId) {
    try {
        const apiKey = 'Manul-Official-Key-3467';  // Replace with your NewsAPI key
        const response = await axios.get(`https://mr-manul-ofc-apis.vercel.app/api/hiru-news?=apikey=${apiKey`);
        const articles = response.data.articles.slice(0, 5); // Get top 5 articles
        let newsMessage = '📰 *Latest News*:\n\n';
        articles.forEach((article, index) => {
            newsMessage += `${index + 1}. *${article.title}*\n${article.description}\n\n`;
        });
        await sock.sendMessage(chatId, { text: newsMessage });
    } catch (error) {
        console.error('Error fetching news:', error);
        await sock.sendMessage(chatId, { text: 'Sorry, I could not fetch news right now.' });
    }
};
