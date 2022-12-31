import { Request, Response } from 'express';

export const success = (req: Request, res: Response) => {
  res.send();
};

export const error = (req: Request, res: Response) => {
  res;
};
