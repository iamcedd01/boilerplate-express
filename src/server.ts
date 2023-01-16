import app from './app';
import { APP_PORT } from '@config/secrets';
import logger from '@helpers/logger';

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  process.kill(process.pid, 'SIGINT');
});

app
  .listen(APP_PORT, () => {
    logger.info(`Server running on port: ${APP_PORT}`);
    console.log(`Server running on port: ${APP_PORT}`);
  })
  .on('error', (e) => logger.error(e));
