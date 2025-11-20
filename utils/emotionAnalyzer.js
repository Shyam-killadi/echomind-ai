// Basic emotion detection from text
class EmotionAnalyzer {
    static analyzeText(text) {
        const emotions = {
            happy: ['happy', 'joy', 'excited', 'good', 'great', 'wonderful', 'love'],
            sad: ['sad', 'depressed', 'unhappy', 'cry', 'hurt', 'bad', 'terrible'],
            angry: ['angry', 'mad', 'frustrated', 'hate', 'annoyed', 'rage'],
            anxious: ['anxious', 'stress', 'worry', 'nervous', 'panic', 'fear'],
            neutral: ['ok', 'fine', 'normal', 'alright']
        };

        const textLower = text.toLowerCase();
        let detectedEmotion = 'neutral';
        let confidence = 0;

        for (const [emotion, keywords] of Object.entries(emotions)) {
            const matches = keywords.filter(word => textLower.includes(word));
            if (matches.length > confidence) {
                confidence = matches.length;
                detectedEmotion = emotion;
            }
        }

        return {
            emotion: detectedEmotion,
            confidence: confidence,
            suggestions: this.getWellnessSuggestions(detectedEmotion)
        };
    }

    static getWellnessSuggestions(emotion) {
        const suggestions = {
            happy: ["Keep up the positive energy!", "Share your happiness with others"],
            sad: ["Take deep breaths", "Talk to a friend", "Listen to uplifting music"],
            angry: ["Count to 10 slowly", "Take a walk", "Practice deep breathing"],
            anxious: ["Try 4-7-8 breathing", "Focus on present moment", "Drink water"],
            neutral: ["Practice mindfulness", "Stay hydrated", "Take breaks regularly"]
        };
        return suggestions[emotion] || ["Take care of yourself today"];
    }
}

module.exports = EmotionAnalyzer;
