import { Request, Response } from 'express';
import logger from './logger.js';

export const success = (req: Request, res: Response) => {
  res.send();
};

export const error = (req: Request, res: Response) => {
  res;
};

export const asyncHandler = async (promise: Promise<unknown>) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
