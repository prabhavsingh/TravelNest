import User from '../model/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import * as factory from './handlerFactory.js';
import { uploadImage } from '../middlewares/imageUploader.js';
import type { NextFunction, Request, Response } from 'express';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req.user.id;
  next();
};

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  },
);

export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: 'null',
    });
  },
);

export const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined! Please use /signup instead',
  });
};

export const getAllUsers = factory.getAll(User);
export const getUser = factory.getOne(User);

//DO NOT update passwords with this!
export const updateUser = factory.UpdateOne(User);
export const deleteUser = factory.deleteOne(User);
