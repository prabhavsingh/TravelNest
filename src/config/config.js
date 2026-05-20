const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT ?? 8001,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  database: {
    uri: process.env.DATABASE_URI,
    password: process.env.DATABASE_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    cookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
  },
  stripe: {
    stripePrivateKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  email: {
    from: process.env.EMAIL_FROM,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  mailerSend: {
    from: process.env.EMAIL_FROM,
    host: process.env.MAILERSEND_HOST,
    port: process.env.MAILERSEND_PORT,
    username: process.env.MAILERSEND_USERNAME,
    password: process.env.MAILERSEND_PASSWORD,
  },
  allowedOrigins: process.env.ALLOWED_ORIGINS,
};

module.exports = config;
