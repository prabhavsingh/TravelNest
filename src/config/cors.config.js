const cors = require('cors');
const config = require('./config');

const corsConfig = {
  origin: (origin, callback) => {
    const allowedOrigins = config.allowedOrigins
      ? config.allowedOrigins.split(',')
      : [];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`not allowed by cors ${origin}`));
    }
  },
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  maxAge: 600, // cache preflight response for 10 min -> avoid sending options request multiple time
  optionsSuccessStatus: 200,
};

module.exports = corsConfig;
