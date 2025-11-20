const express = require('express');
const EmotionAnalyzer = require('../utils/emotionAnalyzer');
const router = express.Router();

// Analyze emotion from text
router.post('/analyze', (req, res) => {
    const { text, userId } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    const emotionResult = EmotionAnalyzer.analyzeText(text);
    
    // Store emotion with memory (optional)
    const emotionMemory = {
        userId,
        emotion: emotionResult.emotion,
        text: text,
        timestamp: new Date().toISOString()
    };

    res.json({
        analyzedText: text,
        ...emotionResult
    });
});

// Emergency support for extreme emotions
router.post('/emergency-support', (req, res) => {
    const { emotion, userId } = req.body;
    
    const extremeEmotions = ['sad', 'angry', 'anxious'];
    
    if (extremeEmotions.includes(emotion)) {
        return res.json({
            emergency: true,
            message: "I'm here for you. You're not alone.",
            immediateActions: [
                "Take 3 deep breaths",
                "Call a trusted friend",
                "Contact crisis helpline: 988"
            ],
            calmTone: true
        });
    }

    res.json({ emergency: false, message: "You're doing great!" });
});

module.exports = router;
