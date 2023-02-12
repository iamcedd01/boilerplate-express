import logger from '@helpers/logger';
import mongoose, { ConnectOptions } from 'mongoose';
import secrets from './secrets';

const { host, name, password, port, user } = secrets.db;

// Build the connection string
const dbURI = secrets.isProduction
  ? `mongodb://${user}:${encodeURIComponent(password)}@${host}:${port}/${name}`
  : 'mongodb://localhost:27017';

const options: ConnectOptions = {
  autoIndex: true,
  bufferCommands: false, // If not connected, return errors immediately rather than waiting for reconnect
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  maxPoolSize: 10, // Maintain up to 10 socket connections
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

logger.debug(dbURI);

mongoose.set('strictQuery', true);

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => logger.info('Mongoose connection done'))
  .catch((e) => {
    logger.error('Mongoose connection error');
    logger.error(e);
  });

/** CONNECTION EVENTS */
// When successfully connected
mongoose.connection.on('connected', () => logger.info(`Mongoose default connection open to ${dbURI}`));

// When the connection throws an error
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
mongoose.connection.on('error', (err) => logger.error(`Mongoose default connection error: ${err}`));

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
