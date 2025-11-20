const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['text', 'voice', 'learning', 'emotion'], default: 'text' },
    emotion: String,
    embedding: [Number], // For vector search
    tags: [String],
    timestamp: { type: Date, default: Date.now }
});

// Create index for faster search
memorySchema.index({ userId: 1, timestamp: -1 });
memorySchema.index({ tags: 1 });

module.exports = mongoose.model('Memory', memorySchema);
