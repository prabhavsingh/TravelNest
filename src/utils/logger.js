const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, stack, service }) => {
      const mainMessage = `[${timestamp}] [${service}] [${process.env.NODE_ENV}] ${level}: ${message}`;
      // If there's an error stack trace, print it on a new line below
      return stack ? `${mainMessage}\n💥 STACK TRACE:\n${stack}` : mainMessage;
    }),
  ),
  defaultMeta: { service: 'NodeTourGuide' },
  transports: [new winston.transports.Console()],
});

module.exports = logger;
