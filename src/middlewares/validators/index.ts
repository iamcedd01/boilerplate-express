import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().reduce(
      (result, item) => ({
        ...result,
        [item.param]: item.msg,
      }),
      {}
    );

    return res.status(422).json({
      errors: extractedErrors,
    });
  }

  next();
};

export default validator;
