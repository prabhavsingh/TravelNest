const Review = require('../model/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  //Allow  nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReviews = factory.getOne(Review);
exports.createReview = factory.CreateOne(Review);
exports.updateReview = factory.UpdateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
