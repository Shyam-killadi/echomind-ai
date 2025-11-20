// EchoMind AI - Render Compatible Version
const express = require('express');
const path = require('path');
const app = express();

// Render provides PORT environment variable
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'EchoMind AI Server is Running! 🚀',
    status: 'OK',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'Healthy', 
    service: 'EchoMind AI',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// API Routes
app.get('/api/status', (req, res) => {
  res.json({ 
    features: ['Authentication', 'Memory System', 'Emotion Analysis', 'AI Chat'],
    status: 'operational'
  });
});

// Start server - CRITICAL: Bind to 0.0.0.0 for Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ EchoMind AI successfully started`);
  console.log(`📍 Running on port: ${PORT}`);
  console.log(`🌐 Access URL: http://0.0.0.0:${PORT}`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
});
