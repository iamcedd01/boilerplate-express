import { Router } from 'express';

import SampleController from './sample.controller';

const router = Router();

router.use('/', SampleController);

export default router;
