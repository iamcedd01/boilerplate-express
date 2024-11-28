import { Router } from 'express';

import deserializeUser from '@middlewares/deserializeUser';

import AuthController from './auth.controller';
import ClaimsController from './claims';
import SampleController from './sample.controller';

const router = Router();

router.use('/', SampleController);
router.use('/auth', AuthController);
router.use('/claims', deserializeUser, ClaimsController);

export default router;
