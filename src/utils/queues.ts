import { Queue, type DefaultJobOptions } from 'bullmq';
import { redisConnection } from '../config/redis.config.js';

const defaultJobOptions: DefaultJobOptions = {
  // --- RETRY STRATEGY ---
  attempts: 3, // Total times to attempt the job if it fails
  backoff: {
    type: 'exponential', // Wait 1s, then 2s, then 4s...
    delay: 1000, // Initial baseline delay in ms
  },
  // --- DATA PRUNING & REDIS STORAGE POLICIES ---
  // Keeping data forever blows up Redis memory. Clean it up automatically.
  removeOnComplete: {
    age: 24 * 3600, // Keep successfully processed jobs for 24 hours max
    count: 1000, // OR keep the last 1000 jobs, whichever boundary hits first
  },
  removeOnFail: {
    age: 7 * 24 * 3600, // Keep failed jobs for 7 days (gives devs time to debug logs)
    count: 5000, // OR caps failed history at 5000 records
  },
};

const emailQueue = new Queue('email-queue', {
  connection: redisConnection,
  defaultJobOptions,
});

// const imageUploadQueue = new Queue('image-queue', {
//   connection: redisConnection,
//   defaultJobOptions,
// });

export const addEmailToQueue = async function (newUser, url) {
  await emailQueue.add('email-job', { newUser, url });
};

// const addImageToQueue = async function (file) {
//   await imageUploadQueue.add('image-job', { file });
// };
