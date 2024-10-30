import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import loadErrorHandlers from '@middlewares/errorHandler';
import express, { Application } from 'express';
import router from './routes';

import '@config/database';
import secrets from '@config/secrets';

const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(helmet());
app.use(compression());
if (secrets.env === 'development') {
  app.use(morgan('dev'));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use(
  session({
    cookie: { maxAge: 30000, secure: true, httpOnly: true, sameSite: 'strict' }, // 30 seconds
    saveUninitialized: false,
    secret: 'some secret',
    resave: false,
  })
);

app.use(cookieParser());

app.use('/api', router);
loadErrorHandlers(app);

export default app;
