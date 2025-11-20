const express = require('express');
const path = require('path');
require('dotenv').config();
const { connectDB } = require('./config/database');
const app = express();

// Render provides PORT, use it directly
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Import routes
const authRoutes = require('./routes/auth');
const memoryRoutes = require('./routes/memory');
const biometricRoutes = require('./routes/biometric');
const emotionRoutes = require('./routes/emotion');
const voiceRoutes = require('./routes/voice');
const aiRoutes = require('./routes/ai');
app.use('/api/auth', authRoutes);
app.use('/api/memory', memoryRoutes);
app.use('/api/biometric', biometricRoutes);
app.use('/api/emotion', emotionRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'EchoMind AI',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Start server - SIMPLIFIED for Render
app.listen(PORT, () => {
  console.log(`🚀 EchoMind AI running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
