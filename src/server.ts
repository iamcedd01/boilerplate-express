import secrets from '@config/secrets';
import logger from '@helpers/logger';
import app from './app';

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  process.kill(process.pid, 'SIGINT');
});

app
  .listen(secrets.port, () => {
    logger.info(`Server running on port: ${secrets.port}`);
    console.log(`Server running on port: ${secrets.port}`);
  })
  .on('error', (e) => logger.error(e));
