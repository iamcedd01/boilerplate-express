import logger from '@helpers/logger';
import { IS_PRODUCTION } from '@config/secrets';

import { Application, NextFunction, Request, Response } from 'express';

function loadErrorHandlers(app: Application) {
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    interface BetterError extends Error {
      status?: number;
    }

    const err: BetterError = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use((error: any, _req: Request, res: Response) => {
    if (error.name === 'ValidationError') {
      return res.status(422).json({
        errors: Object.keys(error.errors).reduce(
          (errors: Record<string, string>, key: string) => ({ [errors[key]]: error.errors[key].message }),
          {}
        ),
      });
    }

    logger.error(error);
    res.status(error.status || 500);
    res.json({
      errors: {
        message: error.message,
        error: !IS_PRODUCTION ? error : {},
      },
    });
  });
}

export default loadErrorHandlers;
