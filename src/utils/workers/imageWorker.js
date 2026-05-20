// const { Worker, tryCatch } = require('bullmq');
// const { redisConnection } = require('../../config/redis.config');
// const { uploadImage } = require('../../middlewares/imageUploader');
// const logger = require('../logger');

// const imageWorker = new Worker(
//   'image-queue',
//   async (job) => {
//     const { file } = job.data;
//     try {
//       logger.info(`Worker processing job: ${job.id}`);
//       await uploadImage(file);
//     } catch (error) {
//       logger.error(`Failed to upload image for job ${job.id}:${error}`);
//       throw error;
//     }
//   },
//   {
//     connection: redisConnection,
//   },
// );

// imageWorker.on('completed', (job) => {
//   logger.info(`Job ${job.id} has completed!`);
//   logger.info(`Image uploaded send successully`);
// });

// imageWorker.on('failed', (job, err) => {
//   logger.error(`Job ${job.id} has failed with ${err}`);
// });
