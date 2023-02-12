/* eslint-disable quotes */
import AppError, { HttpCode } from '@helpers/appError';
import logger from '@helpers/logger';

import { Application, NextFunction, Request, Response } from 'express';

function loadErrorHandlers(app: Application) {
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError({ description: 'Not Found', httpCode: HttpCode.NOT_FOUND }));
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use((error: Error | AppError | any, _req: Request, res: Response, _next: NextFunction) => {
    if (error.name === 'ValidationError') {
      return res.status(422).json({
        errors: Object.keys(error.errors).reduce(
          (errors: Record<string, string>, key: string) => ({ [errors[key]]: error.errors[key].message }),
          {}
        ),
      });
    }

    let customErr = error;

    if (!(error instanceof AppError)) {
      customErr = new AppError({
        description: "An error has occured and we're working to fix the problem! We'll be up and running shortly.",
        httpCode: 500,
      });
    }

    logger.error(error);
    res.status((customErr as AppError).httpCode).json({
      errors: {
        message: customErr.message,
      },
    });
  });
}

export default loadErrorHandlers;
