const config = require('../config/config');
const logger = require('./logger');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const uploadImageToCloudinary = async function (file, userId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'nodeTourGuide/user-avatar',
        resource_type: 'auto',
        public_id: userId,
        overwrite: true,
        invalidate: true,
      },
      (err, result) => {
        if (err) {
          logger.error(`error while uploading media to cloudinary: ${err}`);
          reject(err);
        } else {
          resolve(result);
        }
      },
    );

    uploadStream.end(file.buffer);
  });
};

const deleteImageFromCloudinary = async function (publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info('media deleted successfully from cloud storage', publicId);
    return result;
  } catch (error) {
    logger.error('Error deleting media from cludinary', error);
    throw error;
  }
};

module.exports = { uploadImageToCloudinary, deleteImageFromCloudinary };
