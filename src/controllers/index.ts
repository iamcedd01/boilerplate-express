import { Router } from 'express';

import AuthController from './auth.controller';
import SampleController from './sample.controller';

const router = Router();

router.use('/', SampleController);
router.use('/auth', AuthController);

export default router;
