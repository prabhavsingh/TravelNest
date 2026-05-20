<<<<<<<< HEAD:src/controllers/handlerFactory.ts
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import type { NextFunction, Request, Response } from 'express';

export function deleteOne(Model) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
========
const { redis } = require('../config/redis.config');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
>>>>>>>> development:src/controllers/handlerFactory.js
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
}

export function UpdateOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
}

export function CreateOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
}

<<<<<<<< HEAD:src/controllers/handlerFactory.ts
export function getOne(Model, popOptions) {
  return catchAsync(async (req, res, next) => {
========
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const cacheKey = `${Model.modelName}:${req.params.id}`;
    const cacheValue = await redis.get(cacheKey);
    if (cacheValue) {
      const doc = JSON.parse(cacheValue);
      return res.status(200).json({
        status: 'success',
        data: {
          data: doc,
        },
      });
    }
>>>>>>>> development:src/controllers/handlerFactory.js
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    await redis.setex(cacheKey, 300, JSON.stringify(doc));
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
}

export function getAll(Model) {
  return catchAsync(async (req, res, next) => {
    //to allow for nested GET reviews on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const modelName = Model.modelName;
    const sortedQuery = Object.keys(req.query)
      .sort()
      .reduce((acc, key) => {
        acc[key] = req.query[key];
        return acc;
      }, {});
    const nestedParamStr = req.params.tourId
      ? `:nested_${req.params.tourId}`
      : '';

    const cacheKey = `${modelName}:all:${JSON.stringify(sortedQuery)}${nestedParamStr}`;
    const cacheValue = await redis.get(cacheKey);
    if (cacheValue) {
      const docs = JSON.parse(cacheValue);
      return res.status(200).json({
        status: 'Success',
        requestedAT: req.requestTime,
        results: docs.length,
        data: {
          data: docs,
        },
      });
    }
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const docs = await features.query.explain();
    const docs = await features.query;
    await redis.setex(cacheKey, 300, JSON.stringify(docs));
    //send response
    res.status(200).json({
      status: 'Success',
      requestedAT: req.requestTime,
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
}
