import winston from 'winston';
import LokiTransport from 'winston-loki';
import config from '../config/config.js';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, stack, service }) => {
      const mainMessage = `[${timestamp}] [${service}] [${config.node_env}] ${level}: ${message}`;
      // If there's an error stack trace, print it on a new line below
      return stack ? `${mainMessage}\n💥 STACK TRACE:\n${stack}` : mainMessage;
    }),
  ),
  defaultMeta: { service: 'NodeTourGuide' },
  transports: [
    new winston.transports.Console(),
    new LokiTransport({
      host: 'http://127.0.0.1:3100',
    }),
  ],
});

export default logger;
