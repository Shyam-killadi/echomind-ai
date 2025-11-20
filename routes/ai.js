const express = require('express');
const AIService = require('../utils/aiService');
const router = express.Router();

// AI Chat with memory context
router.post('/chat', async (req, res) => {
  const { message, userId } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // In real app, fetch user memories from database
    const userMemories = []; // Placeholder for memories
    
    const aiResponse = await AIService.generateResponse(message, userMemories);
    
    res.json({
      userMessage: message,
      aiResponse: aiResponse.response,
      memoryUsed: aiResponse.memoryUsed,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'AI service error' });
  }
});

// Content summarization
router.post('/summarize', async (req, res) => {
  const { content, userId } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const summary = await AIService.summarizeContent(content);
    
    res.json({
      original: content.substring(0, 200) + '...',
      summary: summary,
      lengthReduction: Math.round((1 - summary.length / content.length) * 100)
    });
  } catch (error) {
    res.status(500).json({ error: 'Summarization failed' });
  }
});

module.exports = router;
