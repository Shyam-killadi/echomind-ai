# EchoMind AI - Deployment Guide

## Quick Start
1. Clone repository
2. Run: npm install
3. Copy .env.example to .env and configure
4. Start MongoDB service
5. Run: npm run dev

## Production Deployment

### Option 1: Heroku
1. heroku create echomind-ai
2. heroku addons:create mongolab
3. heroku config:set OPENAI_API_KEY=your_key
4. git push heroku main

### Option 2: AWS EC2
1. Launch EC2 instance
2. Install Node.js, MongoDB, Nginx
3. Setup PM2: pm2 start server.js
4. Configure Nginx reverse proxy

### Option 3: Docker
1. docker build -t echomind-ai .
2. docker run -p 3000:3000 echomind-ai

## Environment Variables
- OPENAI_API_KEY: Get from https://platform.openai.com
- MONGODB_URI: MongoDB connection string
- JWT_SECRET: Random secret for authentication

## Security Notes
- Enable HTTPS in production
- Use environment variables for secrets
- Regular database backups
- Monitor API usage limits
