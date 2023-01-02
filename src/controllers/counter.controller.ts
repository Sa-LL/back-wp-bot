import { Request, Response } from 'express';
import logger from '../utils/logger.js';
import services from '../services/counter.service.js';
import { counterSchema } from '../models/counter.model.js';
import { checkQueryParameters } from '../utils/filters.js';
import { GetRequest } from '../types/counter.js';

const getCounter = async (req: GetRequest, res: Response) => {
  try {
    const query = req.query;
    await checkQueryParameters(counterSchema, query);
    const result = await services.get(query);
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send(error?.message || error);
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
