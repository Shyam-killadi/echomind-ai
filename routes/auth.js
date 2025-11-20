const express = require('express');
const { getDB } = require('../config/database');
const bcrypt = require('bcryptjs');
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const db = getDB();
        
        if (!db) {
            return res.status(500).json({ error: 'Database not available' });
        }

        // Check if user exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = {
            email,
            password: hashedPassword,
            name,
            emotionalProfile: { primaryEmotions: [], moodHistory: [] },
            createdAt: new Date()
        };

        const result = await db.collection('users').insertOne(user);

        res.json({ 
            message: 'User registered successfully!', 
            user: { id: result.insertedId, email, name } 
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = getDB();
        
        if (!db) {
            return res.status(500).json({ error: 'Database not available' });
        }

        const user = await db.collection('users').findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ 
            message: 'Login successful!', 
            user: { id: user._id, email: user.email, name: user.name } 
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
