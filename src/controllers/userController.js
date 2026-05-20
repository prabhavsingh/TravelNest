const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const { uploadImage } = require('../middlewares/imageUploader');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1. create error if user POSTs password data
  if (req.body.password || req.body.passwordConform) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /pdateMyPassword',
        400,
      ),
    );
  }
  //2. filter unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) {
    const { publicId, version } = await uploadImage(req.file, req.user.id);
    filteredBody.photo = `v${version}/${publicId}`;
    // await addImageToQueue({
    //   userId: req.user.id,
    //   filePath: req.file.path,
    //   originalname: req.file.originalname,
    //   mimetype: req.file.mimetype,
    // });
  }

  //3. update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: 'null',
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined! Please use /signup instead',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

//DO NOT update passwords with this!
exports.updateUser = factory.UpdateOne(User);
exports.deleteUser = factory.deleteOne(User);
