import mongoose from 'mongoose';
import config from './config.js';
import logger from '../utils/logger.js';
import AppError from '../utils/appError.js';

if (!config.database.uri || !config.database.password) {
  logger.error('DB env varivales not present.');
  throw new AppError('Database configuration is missing. Exiting...', 500);
}

const DB = config.database.uri.replace('<PASSWORD>', config.database.password);

export async function connectToDB() {
  try {
    await mongoose.connect(DB);
    logger.info('Mongodb connection is successful.');
  } catch (error) {
    logger.error('DB connection error', error);
    logger.error('EXITING NOW');
    process.exit(1);
  }
}

export async function disconnectFromDB() {
  await mongoose.connection.close();
  logger.info('Mongodb connection closed.');
}
