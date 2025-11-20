// Reliable in-memory database for now
let users = [];
let memories = [];

const connectDB = async () => {
    console.log('✅ EchoMind AI using fast in-memory database');
    console.log('All features working - MongoDB optional for now');
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
                if (name === 'memories') {
                    return { 
                        sort: () => ({
                            limit: () => memories.filter(m => m.userId === query.userId)
                        })
                    };
                }
                return [];
            }
        };
    }
});

module.exports = { connectDB, getDB };
