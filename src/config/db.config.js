const mongoose = require('mongoose');
const logger = require('../utils/logger');

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  logger.error('DB env varivales not present.');
}
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const connectToDB = async function () {
  try {
    await mongoose.connect(DB);
    logger.info('DB connection successfull');
  } catch (error) {
    logger.error('Error in DB connection', error);
    logger.info('EXITING NOW');
    process.exit(1);
  }
};

module.exports = connectToDB;
