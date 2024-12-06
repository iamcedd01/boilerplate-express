import { getFacilityDropdownSearch } from '@services/partners/facility.service';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/dropdown', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;

    const facilities = await getFacilityDropdownSearch((search as string) ?? '');
    return res.json(facilities);
  } catch (err) {
    next(err);
  }
});

export default router;
