import { NextFunction, Request, Response } from 'express';
import config from '../configuration/config.js';
import logger from '../utils/logger.js';

function errorLogs(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err);
  next(err);
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (config.debug) {
    res.status(500).json(err);
  } else {
    res.status(500).send('Internal server error');
  }
}

export default {
  errorLogs,
  errorHandler,
};
