import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.js';
import services from '../services/counter.service.js';
import { counterSchema } from '../models/counter.model.js';
import { checkQueryParameters } from '../utils/filters.js';
import { GetRequest, PatchRequest } from '../types/counter.js';

const getCounter = async (req: GetRequest, res: Response, next: NextFunction) => {
  try {
    const query = req.query;
    await checkQueryParameters(counterSchema, query);
    const result = await services.get(query);
    res.status(200).send(result);
  } catch (error: any) {
    next(error);
  }
};

const getCounterByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await services.getByID(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const createCounter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const result = await services.create(body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const patchCounter = async (req: PatchRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (!id) throw new Error('ID not found');
    const result = await services.update(id, body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const deleteCounter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await services.delete(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getCounter,
  getCounterByID,
  createCounter,
  patchCounter,
  deleteCounter,
};
