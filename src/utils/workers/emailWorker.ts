import { Worker } from 'bullmq';
import Email from '../email.js';
import logger from '../logger.js';
import { redisConnection } from '../../config/redis.config.js';

const emailWorker = new Worker(
  'email-queue',
  async (job) => {
    const { newUser, url } = job.data;
    try {
      logger.info(`Worker processing job: ${job.id}`);
      await new Email(newUser, url).sendWelcome();
    } catch (error) {
      logger.error(`Failed to send email for job ${job.id}:${error}`);
      throw error; // Rethrow so BullMQ knows the job failed
    }
  },
  { connection: redisConnection },
);

emailWorker.on('completed', (job) => {
  logger.info(`Job ${job.id} has completed!`);
  logger.info(`Email send successully to ${job.data.newUser.email}`);
});

emailWorker.on('failed', (job, err) => {
  logger.error(`Job ${job.id} has failed with ${err}`);
});
