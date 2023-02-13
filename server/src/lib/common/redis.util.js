const redis = require("redis");
const redisClient = redis.createClient({
    legacyMode:true,
    socket:{
        port: process.env.REDIS_PORT,
        address: process.env.REDIS_HOST
    }
});
redisClient.on('connect', () => console.log('Redis Clinet On'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().catch(console.error);

module.exports = redisClient;