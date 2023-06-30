import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.js';
import services from '../services/counter.service.js';
import { counterSchema } from '../models/counter.model.js';
import { checkQueryParameters } from '../utils/filters.js';
import { GetRequest, PatchRequest } from '../types/counter.js';
import { asyncHandler } from '../utils/response.js';

const getCounter = async (req: GetRequest, res: Response, next: NextFunction) => {
  const query = req.query;
  const [_, errorQuery] = await asyncHandler(checkQueryParameters(counterSchema, query));
  if (errorQuery) return next(errorQuery);

  const [result, errorDB] = await services.get(query);
  if (errorDB) return next(errorDB);

  res.status(200).send(result);
};

const getCounterByID = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const [result, error] = await asyncHandler(services.getByID(id));
  if (error) return next(error);

  res.status(200).send(result);
};

const createCounter = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const [result, errorDB] = await asyncHandler(services.create(body));
  if (errorDB) return next(errorDB);

  res.status(200).send(result);
};

const patchCounter = async (req: PatchRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const body = req.body;
  if (!id) return next(new Error('ID not found'));

  const [result, errorDB] = await asyncHandler(services.update(id, body));
  if (errorDB) return next(errorDB);

  res.status(200).send(result);
};

const deleteCounter = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const [result, errorDB] = await asyncHandler(services.delete(id));
  if (errorDB) return next(errorDB);

  res.status(200).send(result);
};

export default {
  getCounter,
  getCounterByID,
  createCounter,
  patchCounter,
  deleteCounter,
};
