import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }

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
};

export default validator;
