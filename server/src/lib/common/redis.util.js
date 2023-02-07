const redis = require("redis");
const redisClient = redis.createClient({
    legacyMode:true,
    socket:{
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_URL
    }
});
redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().catch(console.error);

module.exports = redisClient;