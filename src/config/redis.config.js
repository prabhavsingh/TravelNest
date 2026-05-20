const Redis = require('ioredis');
const logger = require('../utils/logger');
const config = require('./config');

const redisConnection = {
  host: config.redis.host || '127.0.0.1',
  port: config.redis.port || 6379,
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
