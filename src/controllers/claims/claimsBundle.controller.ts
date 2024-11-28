import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello There!');
});

router.get('/:status/count', (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log();
  } catch (err) {
    next(err);
  }
});

export default router;
