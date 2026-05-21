import type { NextFunction, Request, Response } from 'express';

const catchAsync = (fn: Function) => {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
