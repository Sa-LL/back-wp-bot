import { Request, Response } from 'express';
import logger from '../utils/logger.js';
import services from '../services/counter.service.js';

const getCounter = async (req: Request, res: Response) => {
  try {
    res.send('working');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

const createCounter = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    logger.info(body, 'body');
    const result = await services.create(body);
    res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    res.status(500).send();
  }
};

export default {
  getCounter,
  createCounter,
};
