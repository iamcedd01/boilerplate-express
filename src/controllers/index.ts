import { Router } from 'express';

import deserializeUser from '@middlewares/deserializeUser';

import AuthController from './auth.controller';
import ClaimsController from './claims';
import PartnersController from './partners';
import SampleController from './sample.controller';

const router = Router();

router.use('/', SampleController);
router.use('/auth', AuthController);
router.use('/claims', deserializeUser, ClaimsController);
router.use('/partners', deserializeUser, PartnersController);

export default router;
