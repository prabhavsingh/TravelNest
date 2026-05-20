const helmet = require('helmet');

const helmetConfig = helmet({
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
});

module.exports = helmetConfig;
