import compression from 'compression';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';

import loadErrorHandlers from '@middlewares/error-handler';
import express, { Application } from 'express';
import router from './routes';

import '@config/database';

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    rolling: true,
    cookie: { maxAge: 30000, secure: true, httpOnly: true, sameSite: 'strict' }, // 30 seconds
    saveUninitialized: false,
    secret: 'some secret',
    resave: false,
  })
);

app.use('/api', router);
loadErrorHandlers(app);

export default app;
