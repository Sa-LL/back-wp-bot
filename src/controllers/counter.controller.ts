import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.js';
import services from '../services/counter.service.js';
import { counterSchema, customCounterLabels } from '../models/counter.model.js';
import { checkQueryParameters } from '../utils/filters.js';
import { GetRequest, PatchRequest } from '../types/counter.js';
import { asyncHandler } from '../utils/response.js';
import { TOptions } from 'src/types/types.js';

const getCounter = async (req: GetRequest, res: Response, next: NextFunction) => {
  const { page, limit, sort, ...query } = req.query;
  const [_, errorQuery] = await asyncHandler(checkQueryParameters(counterSchema, query));
  if (errorQuery) return next(errorQuery);

  const options: TOptions = {
    customLabels: customCounterLabels,
    limit: limit || 4,
    page: page || 1,
  };

  if (sort) options['sort'] = sort;

  const [result, errorDB] = await asyncHandler(services.get(query, options));
  if (errorDB) return next(errorDB);

  res.status(200).send(result);
};

const getCounterByTitle = async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.params;
  const [result, error] = await asyncHandler(services.getByTitle(title));
  if (error) {
    const cause = error.cause as { type: number };
    if (cause.type === 404) return res.status(404).send(error.message);
    return next(error);
  }

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
  getCounterByTitle,
  createCounter,
  patchCounter,
  deleteCounter,
};
