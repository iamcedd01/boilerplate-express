import { Router } from 'express';

import ApiRoutes from '@controllers/index';

const router = Router();

router.use('/v1', ApiRoutes);

export default router;
