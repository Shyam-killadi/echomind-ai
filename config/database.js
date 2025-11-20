// Simple in-memory database for now
let users = [];
let memories = [];

const connectDB = async () => {
    console.log('✅ EchoMind AI database ready');
    console.log('📁 Using in-memory storage (MongoDB optional)');
};

const getDB = () => ({
    collection: (name) => {
        return {
            findOne: async (query) => {
                if (name === 'users') return users.find(u => u.email === query.email);
                return null;
            },
            insertOne: async (doc) => {
                const newDoc = { ...doc, _id: Date.now().toString() };
                if (name === 'users') users.push(newDoc);
                if (name === 'memories') memories.push(newDoc);
                return { insertedId: newDoc._id };
            },
            find: async (query) => {
                if (name === 'memories' && query.userId) {
                    return memories.filter(m => m.userId === query.userId);
                }
                return [];
            }
        };
    }
});

module.exports = { connectDB, getDB };
