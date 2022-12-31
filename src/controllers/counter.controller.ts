import { Request, Response } from 'express';
import logger from '../utils/logger.js';
import services from '../services/counter.service.js';
import counterModel from '../models/counter.model.js';
import { getModelKeys } from '../utils/utils.js';

const getCounter = async (req: Request, res: Response) => {
  try {
    const result = await services.get();
    getModelKeys(counterModel);
    res.status(200).send(result);
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
