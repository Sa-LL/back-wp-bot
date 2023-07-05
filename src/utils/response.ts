import { Request, Response } from 'express';
import logger from './logger.js';

export const success = (req: Request, res: Response) => {
  res.send();
};

export const error = (req: Request, res: Response) => {
  res;
};

export async function asyncHandler<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error: any) {
    return [null, error];
  }
}
