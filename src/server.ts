import { setServers } from 'dns';
import dotenv from 'dotenv';

setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err: Error) => {
  logger.error('UNHANDLED EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

let server: Server;

import app from './app.js';
import { createServer, Server } from 'http';
import { connectToDB, disconnectFromDB } from './config/db.config.js';
import { connectRedis } from './config/redis.config.js';
import config from './config/config.js';
import logger from './utils/logger.js';

const shutdown = (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  if (!server) {
    process.exit(0);
  }

  server.close(async (err) => {
    if (err) {
      logger.error('Error during server close', err);
      process.exit(1);
    }
    try {
      await disconnectFromDB();
      logger.info('Database connection closed.');
      logger.info('Shutdown complete');
      process.exit(0);
    } catch (error) {
      logger.error('Error during DB disconnect:', error);
      process.exit(1);
    }
  });

  setTimeout(() => {
    logger.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 10000);
};

async function startServer() {
  await connectToDB();
  await connectRedis();
  const port = config.port || 8000;

  server = createServer(app);
  server.listen(port, () => {
    logger.info(`App is running on port ${port}...`);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer().catch((error) => {
  logger.error('Error while starting the server', error);
  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
