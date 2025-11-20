const express = require('express');
const Memory = require('../models/Memory');
const router = express.Router();

// Store memory
router.post('/store', async (req, res) => {
    try {
        const { userId, content, type, emotion } = req.body;
        
        const memory = new Memory({
            userId,
            content,
            type: type || 'text',
            emotion
        });
        
        await memory.save();
        
        res.json({ 
            message: 'Memory stored in database!', 
            memory: {
                id: memory._id,
                content: memory.content,
                type: memory.type,
                timestamp: memory.timestamp
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to store memory' });
    }
});

// Search memories
router.get('/search', async (req, res) => {
    try {
        const { userId, query } = req.query;
        
        const memories = await Memory.find({
            userId,
            content: { $regex: query, $options: 'i' }
        }).sort({ timestamp: -1 }).limit(10);
        
        res.json({ results: memories });
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
});

// Get all user memories
router.get('/user/:userId', async (req, res) => {
    try {
        const memories = await Memory.find({ userId: req.params.userId })
                                   .sort({ timestamp: -1 })
                                   .limit(50);
        res.json({ memories });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch memories' });
    }
});

module.exports = router;
