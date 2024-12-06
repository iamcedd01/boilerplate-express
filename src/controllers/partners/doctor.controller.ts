import { getDoctorDropdownSearch } from '@services/partners/doctor.service';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/dropdown', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;

    const doctors = await getDoctorDropdownSearch((search as string) ?? '');
    return res.json(doctors);
  } catch (err) {
    next(err);
  }
});

export default router;
