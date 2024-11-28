import { Router } from 'express';

import ClaimsBundleController from './claimsBundle.controller';

const router = Router();

router.use('/bundles', ClaimsBundleController);

export default router;
