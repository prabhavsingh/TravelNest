const User = require('../model/userModel');
const AppError = require('../utils/appError');
const { uploadImageToCloudinary } = require('../utils/cloudinary');
const logger = require('../utils/logger');

const uploadImage = async (file, userId) => {
  if (!file) {
    logger.error('no file found. please add a file and try again');
    throw new Error('no file found');
  }

  const { originalname, mimetype } = file;
  logger.info(`File details: name=${originalname}, type=${mimetype}`);
  logger.info('Uploading to cloudinary starting...');

  const cloudinaryUploadResult = await uploadImageToCloudinary(file, userId);
  logger.info(
    `Cloudinary upload successfully. Public Id: - ${cloudinaryUploadResult.public_id}`,
  );

  const result = {
    publicId: cloudinaryUploadResult.public_id,
    version: cloudinaryUploadResult.version,
    originalName: originalname,
    mimeType: mimetype,
    url: cloudinaryUploadResult.secure_url,
  };

  return result;
};

module.exports = { uploadImage };
