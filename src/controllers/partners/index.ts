import { Router } from 'express';

import DoctorController from './doctor.controller';
import FacilityController from './facility.controller';

const router = Router();

router.use('/doctors', DoctorController);
router.use('/facilities', FacilityController);

export default router;
