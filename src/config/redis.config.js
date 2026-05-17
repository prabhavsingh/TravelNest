const Redis = require('ioredis');
const logger = require('../utils/logger');

const redisConnection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
};

const redis = new Redis({
  ...redisConnection,
  lazyConnect: true, // Prevents connecting instantly upon creation
  maxRetriesPerRequest: null, // Keeps trying to reconnect without crashing
});

redis.on('error', (err) => {
  logger.error('Redis connection failed');
});

const connectRedis = async function () {
  try {
    await redis.connect();
    logger.info('Redis connected successfully!');
  } catch (error) {
    logger.error('Could not connect to Redis:', error);
  }
};

module.exports = { connectRedis, redis, redisConnection };
