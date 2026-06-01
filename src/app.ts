import path from 'path';
import express from 'express';
import morgon from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
// @ts-ignore
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import type { NextFunction, Request, Response } from 'express';

import config from './config/config.js';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import viewRouter from './routes/viewRoutes.js';
import * as bookingController from './controllers/bookingController.js';
import bookingRouter from './routes/bookingRoutes.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import corsConfig from './config/cors.config.js';
import helmetConfig from './config/security.config.js';
import { initMetric, register } from './utils/metrics.js';
import './utils/workers/workers.js';

const app = express();

app.enable('trust proxy');
app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), './views'));

initMetric(app);

// 1. MIDDLEWARES
//implement cors
app.use(cors(corsConfig));
//serving static files
app.use(express.static(path.join(process.cwd(), './public')));

//Set security HTTP headers
app.use(helmetConfig);
if (config.node_env!.trim() === 'development') {
  app.use(morgon('dev'));
}

//limit request from same API
const limiter = rateLimit({
  max: 100,
  // windowMS: 60 * 60 * 1000,
  validate: { trustProxy: false },
  message: 'Too many request from this IP, please try again in hour!',
});
app.use('/api', limiter);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  bookingController.webhookCheckout,
);

//adds body data on req - data from the body is added to req object
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//data sanitization against NOSQL query injection
app.use(mongoSanitize());

//data sanitization against xss
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSixe',
      'difficulty',
      'price',
    ],
  }),
);

app.use(compression());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// 2. ROUTE HANDLERS

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// 3. ROUTES

app.use('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome! App is working.',
  });
});

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

//metrics endpoint for prometheus
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
