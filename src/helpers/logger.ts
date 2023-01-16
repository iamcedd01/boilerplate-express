import { IS_PRODUCTION, LOG_DIRECTORY } from '@config/secrets';
import * as fs from 'fs';
import * as winston from 'winston';
import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

const dir: string = LOG_DIRECTORY;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = IS_PRODUCTION ? 'warn' : 'debug';

const options: DailyRotateFileTransportOptions = {
  level: logLevel,
  filename: `${dir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  handleExceptions: true,
  json: true,
  maxSize: '20m',
  maxFiles: '14d',
};

export default winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.prettyPrint()),
      stderrLevels: ['info', 'error'],
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options)],
  exitOnError: false, // Do not exit on handled exceptions
});
