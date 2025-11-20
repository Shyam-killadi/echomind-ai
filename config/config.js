const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: 3000,
        mongoURI: 'mongodb://localhost:27017/echomind',
        openaiKey: process.env.OPENAI_API_KEY,
        jwtSecret: 'dev-secret-key',
        baseURL: 'http://localhost:3000'
    },
    production: {
        port: process.env.PORT || 3000,
        mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/echomind',
        openaiKey: process.env.OPENAI_API_KEY,
        jwtSecret: process.env.JWT_SECRET,
        baseURL: process.env.BASE_URL
    }
};

module.exports = config[env];
