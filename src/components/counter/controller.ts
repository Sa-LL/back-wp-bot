import { Request, Response } from 'express';
import logger from '../../../logger/logger.js';
import store from './store.js';

const getCounter = async (req: Request, res: Response) => {
  try {
    res.send('Funcionó');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createCounter = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    logger.info(body, 'body');
    const result = await store.create(body);
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
