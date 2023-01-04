import { NextFunction, Request, Response } from 'express';
import { SchemaOf } from 'yup';

export function validation<T>(schema: SchemaOf<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      await schema.validate(body);
      next();
    } catch (error) {
      next(error);
    }
  };
}
