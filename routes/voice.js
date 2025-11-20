const express = require('express');
const { VoiceService, upload } = require('../utils/voiceService');
const router = express.Router();

// Convert speech to text
router.post('/speech-to-text', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file uploaded' });
        }

        const result = await VoiceService.speechToText(req.file);
        res.json({
            message: 'Voice transcribed successfully',
            transcription: result
        });
    } catch (error) {
        res.status(500).json({ error: 'Voice transcription failed' });
    }
});

// Convert text to speech with emotion
router.post('/text-to-speech', async (req, res) => {
    const { text, emotion, userId } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const result = await VoiceService.textToSpeech(text, emotion);
        res.json({
            message: 'Text converted to speech',
            audio: result
        });
    } catch (error) {
        res.status(500).json({ error: 'Text-to-speech conversion failed' });
    }
});

// Get available voice profiles
router.get('/voice-profiles', (req, res) => {
    const profiles = {
        happy: "Energetic and cheerful voice",
        sad: "Soft and comforting voice", 
        angry: "Calm and steady voice",
        anxious: "Slow and reassuring voice",
        neutral: "Default balanced voice"
    };
    res.json({ voiceProfiles: profiles });
});

module.exports = router;
