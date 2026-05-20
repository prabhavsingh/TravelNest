const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('./config');

if (!config.database.uri || !config.database.password) {
  logger.error('DB env varivales not present.');
}
const DB = config.database.uri.replace('<PASSWORD>', config.database.password);

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
