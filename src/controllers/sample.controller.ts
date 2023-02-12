import deserializeUser from '@middlewares/deserializeUser';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/', deserializeUser, (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello There!');
});

export default router;
