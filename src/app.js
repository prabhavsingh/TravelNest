const path = require('path');
const express = require('express');
const morgon = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingController = require('./controllers/bookingController');
const bookingRouter = require('./routes/bookingRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const corsConfig = require('./config/cors.config');
const config = require('./config/config');
require('./utils/workers/workers');

const app = express();

if (config.node_env && config.node_env.trim() === 'production') {
  app.enable('trust proxy');
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

// 1. MIDDLEWARES
//implement cors
app.use(cors(corsConfig));
//serving static files
app.use(express.static(path.join(__dirname, '../public')));

//Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          'https://js.stripe.com',
          'https://cdn.maptiler.com',
        ],
        frameSrc: ["'self'", 'https://js.stripe.com'], // Allow Stripe Checkout
        workerSrc: ["'self'", 'blob:'],
        connectSrc: [
          "'self'",
          'https://api.maptiler.com', //  Allow MapTiler API requests
        ],
        imgSrc: ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
      },
    },
  }),
);

if (config.node_env.trim() === 'development') {
  app.use(morgon('dev'));
}

//limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
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

app.use((req, res, next) => {
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

app.all('*', (req, res, next) => {
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

module.exports = app;
