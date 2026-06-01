import Review from '../model/reviewModel.js';
// const catchAsync = require('../utils/catchAsync');
import * as factory from './handlerFactory.js';
import type { NextFunction, Request, Response } from 'express';

export const setTourUserIds = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //Allow  nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllReviews = factory.getAll(Review);
export const getReviews = factory.getOne(Review);
export const createReview = factory.CreateOne(Review);
export const updateReview = factory.UpdateOne(Review);
export const deleteReview = factory.deleteOne(Review);
