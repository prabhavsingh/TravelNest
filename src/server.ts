import { setServers } from 'dns';
import { config } from 'dotenv';

setServers(['1.1.1.1', '8.8.8.8']);
config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

let server: Server;

import app from './app.js';
import { disconnectFromDB, connectToMongoDB } from './config/dbConfig.js';
import { createServer, Server } from 'http';
import { connectRedis } from './config/redis.config.js';
import connectToDB from './config/db.config.js';

const shutdown = (signal: string) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  if (!server) {
    process.exit(0);
  }

  server.close(async (err) => {
    if (err) {
      console.error('Error during server close', err);
      process.exit(1);
    }
    try {
      await disconnectFromDB();
      console.log('Database connection closed.');
      console.log('Shutdown complete');
      process.exit(0);
    } catch (error) {
      console.error('Error during DB disconnect:', error);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error(
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
    console.log(`App is running on port ${port}...`);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer().catch((error) => {
  console.log('Error while starting the server', error);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
