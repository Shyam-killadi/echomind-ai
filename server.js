const express = require('express');
const path = require('path');
require('dotenv').config(); // Add this line to load .env file
const { connectDB } = require('./config/database');
const config = require('./config/config');
const app = express();
const PORT = config.port;

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

app.listen(PORT, () => {
  console.log(`🚀 EchoMind AI running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
