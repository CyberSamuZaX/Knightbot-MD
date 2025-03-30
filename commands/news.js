const axios = require('axios');

// Main function to handle news command
async function getHiruNews(sock, chatId) {
    try {
        // Send typing indicator
        await sock.presenceSubscribe(chatId);
        await sock.sendPresenceUpdate('composing', chatId);
        
        // Send initial message
        await sock.sendMessage(chatId, { text: '📰 පුවත් ලබා ගනිමින්... මඳක් රැඳී සිටින්න.' });
        
        // Fetch news from Hiru API
        const response = await axios.get('https://malaka-md-api-bot.vercel.app/news/hiru');
        
        // Check if we got valid data
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('API ප්‍රතිචාර ආකෘතිය වැරදියි');
        }
        
        // Get top 5 articles or all if less than 5
        const articles = response.data.slice(0, 5);
        
        // Create formatted news message
        let newsMessage = `*📺 HIRU NEWS අලුත්ම පුවත් 📺*\n\n`;
        
        // Format each article
        articles.forEach((article, index) => {
            // Try to extract title and description with fallbacks for different property names
            const title = article.title || article.headline || article.name || 'Title not available';
            const desc = article.description || article.content || article.shortDesc || article.text || '';
            const url = article.url || article.link || '';
            
            newsMessage += `*${index + 1}. ${title}*\n${desc}\n${url ? `🔗 ${url}\n` : ''}\n`;
        });
        
        // Add footer
        newsMessage += `\n*⏰ වෙලාව:* ${new Date().toLocaleTimeString()}\n`;
        newsMessage += `*📱 by:* WhatsApp Bot`;
        
        // Send the message to WhatsApp
        await sock.sendMessage(chatId, { text: newsMessage });
        
    } catch (error) {
        console.error('News error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ සමාවන්න, පුවත් ලබා ගැනීමේදී දෝෂයක් සිදු විය.' 
        });
    }
}

// Command handler - use this in your main bot file
function handleCommands(sock, msg, chatId) {
    const command = msg.body ? msg.body.trim().toLowerCase() : '';
    
    if (command === '.news' || command === 'news' || command === '.පුවත්') {
        getHiruNews(sock, chatId);
        return true;
    }
    
    return false; // Command not handled
}

// Export both functions for different implementation options
module.exports = {
    getHiruNews,
    handleCommands
};
