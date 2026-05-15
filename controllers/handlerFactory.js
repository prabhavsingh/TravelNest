const redis = require('../config/redis.config');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.UpdateOne = (Model) =>
  catchAsync(async (req, res, next) => {
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

exports.CreateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

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

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
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
