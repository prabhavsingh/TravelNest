import Tour from '../model/tourModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import User from '../model/userModel.js';
import Booking from '../model/bookingModel.js';
import type { NextFunction, Request, Response } from 'express';

export const getOverview = catchAsync(async (req, res) => {
  //1. Get tour data from collection
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

export const getTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const [tour] = await Tour.find({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review rating user',
    });

    if (!tour)
      return next(new AppError('There is no tour with that name', 404));

    res.status(200).render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
  },
);

export const getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

export const getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up your account',
  });
};

export const getForgotPasswordForm = (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Reset Your Password',
  });
};

export const getResetPasswordForm = (req, res) => {
  res.status(200).render('resetPassword', {
    title: 'Reset Your Password',
    resetToken: req.params.resetToken,
  });
};

export const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};

export const getMyTours = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });
  const tours = await Promise.all(
    bookings.map(async (el) => await Tour.findById(el.tour.id)),
  );

  res.status(200).render('overview', {
    title: ' My Tours',
    tours,
  });
});

export const updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(201).render('account', {
    title: 'Your Account',
    user: updatedUser,
  });
});
