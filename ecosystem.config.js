module.exports = {
  apps: [{
    name: 'echomind-ai',
    script: './server.js',
    instances: 'max',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
