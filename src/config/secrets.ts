import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: '.env' });

const appName = process.env.APP_NAME ?? 'boilerplate-express';

const secrets = {
  name: appName,
  port: process.env.APP_PORT ?? 5001,
  env: process.env.ENVIRONMENT ?? 'development',
  isProduction: process.env.ENVIRONMENT === 'production',
  logDirectory: process.env.LOG_DIRECTORY ?? path.resolve('logs'),
  db: {
    user: process.env.DB_USER ?? 'root',
    name: process.env.DB_NAME ?? 'boilerplate_express',
    host: process.env.DB_HOST ?? 'localhost',
    password: process.env.DB_PASSWORD ?? 'secret',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 27017,
  },
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY ?? '',
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY ?? '',
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY ?? '',
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY ?? '',
  sessionSecret: process.env.SESSION_SECRET ?? appName,
};

export default secrets;
