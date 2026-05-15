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
const promClient = require('prom-client');
const responseTime = require('response-time');
const { transports, createLogger, format } = require('winston');
const LokiTransport = require('winston-loki');

const options = {
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new LokiTransport({
      host: 'http://127.0.0.1:3100',
    }),
  ],
};
const logger = createLogger(options);
const app = express();

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const reqResTime = new promClient.Histogram({
  name: 'http_express_req_res_time',
  help: 'THis tells how much time is taken by req and res',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [1, 5, 10, 50, 100, 200, 500, 800, 1000, 2000, 5000],
});

const httpRequestsCounter = new promClient.Counter({
  name: 'http_total_request_counter',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

register.registerMetric(reqResTime);
register.registerMetric(httpRequestsCounter);

app.use(
  responseTime((req, res, time) => {
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: req.statusCode,
      })
      .observe(time);
  }),
);

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });

  next();
});

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1. MIDDLEWARES
//implement cors
app.use(cors());
app.options('*', cors());
//serving static files
app.use(express.static(path.join(__dirname, 'public')));

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
      },
    },
  }),
);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV.trim() === 'development') {
  app.use(morgon('dev'));
}

//limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
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
