const express = require('express');
const FingerprintAuth = require('../utils/fingerprintAuth');
const router = express.Router();

// Register fingerprint for user
router.post('/register', async (req, res) => {
    const { userId } = req.body;
    
    try {
        const result = await FingerprintAuth.register(userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Fingerprint registration failed' });
    }
});

// Verify fingerprint
router.post('/verify', async (req, res) => {
    try {
        const result = await FingerprintAuth.authenticate();
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: 'Fingerprint verification failed' });
    }
});

module.exports = router;
