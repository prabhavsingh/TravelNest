import { Redis } from 'ioredis';
import logger from '../utils/logger.js';
import config from './config.js';

export const redisConnection = {
  host: config.redis.host || '127.0.0.1',
  port: Number(config.redis.port) || 6379,
};

export const redis = new Redis({
  ...redisConnection,
  lazyConnect: true, // Prevents connecting instantly upon creation
  maxRetriesPerRequest: null, // Keeps trying to reconnect without crashing
});

redis.on('error', (err: Error) => {
  logger.error(`Redis connection failed; ${err}`);
});

export const connectRedis = async function () {
  try {
    await redis.connect();
    logger.info('Redis connected successfully!');
  } catch (error) {
    logger.error('Could not connect to Redis:', error);
  }
};
