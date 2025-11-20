const OpenAI = require('openai');

// Initialize OpenAI (you'll need to add your API key)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here' // Add your key
});

class AIService {
  static async generateResponse(userMessage, userMemories = []) {
    try {
      // Create context from user memories
      const memoryContext = userMemories
        .slice(-5) // Last 5 memories
        .map(m => m.content)
        .join('\n');

      const prompt = `
You are EchoMind AI, an emotional companion that remembers everything about the user.

User memories context:
${memoryContext}

Current message: ${userMessage}

Respond as a supportive, empathetic AI friend. Use memories if relevant. Keep response under 100 words.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a caring, empathetic AI companion that remembers user conversations and provides emotional support." },
          { role: "user", content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7
      });

      return {
        response: completion.choices[0].message.content,
        memoryUsed: memoryContext ? true : false
      };
    } catch (error) {
      return {
        response: "I'm here to listen and support you. How are you feeling today?",
        error: "AI service temporarily unavailable"
      };
    }
  }

  static async summarizeContent(content) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Summarize this content into key points." },
          { role: "user", content: `Summarize: ${content.substring(0, 2000)}` }
        ],
        max_tokens: 100
      });

      return completion.choices[0].message.content;
    } catch (error) {
      return "Summary unavailable at the moment.";
    }
  }
}

module.exports = AIService;
