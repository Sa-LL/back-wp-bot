import { NextFunction, Response } from 'express';
import { GetRequest } from '../types/group.js';
import { asyncHandler } from '../utils/response.js';
import { checkQueryParameters } from '../utils/filters.js';
import { groupSchema } from '../models/group.model.js';
import { TOptions } from '../types/types.js';
import { customLabels } from '../utils/labels.js';
import services from '../services/group.service.js';

const getGroups = async (req: GetRequest, res: Response, next: NextFunction) => {
  const { page, limit, sort, ...query } = req.query;
  const [_, errorQuery] = await asyncHandler(checkQueryParameters(groupSchema, query));
  if (errorQuery) return next(errorQuery);

  const options: TOptions = {
    customLabels: customLabels,
    limit: limit || 10,
    page: page || 1,
  };

  if (sort) options['sort'] = sort;

  const [result, errorDB] = await asyncHandler(services.get(query, options));
  if (errorDB) return next(errorDB);

  res.status(200).send(result);
};

const getGroupById = async (req: GetRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const [result, error] = await asyncHandler(services.getById(id));
  if (error) {
    const cause = error.cause as { type: number };
    if (cause.type === 404) return res.status(404).send(error.message);
    return next(error);
  }

  res.status(200).send(result);
};

const createGroup = async (req: GetRequest, res: Response, next: NextFunction) => {
  const { body } = req;
  const [result, errorDB] = await asyncHandler(services.create(body));
  if (errorDB) return next(errorDB);

  res.status(200).send(result);
};

const patchGroup = async (req: GetRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const body = req.body;
  if (!id) return next(new Error('ID not found'));

  const [result, errorDB] = await asyncHandler(services.update(id, body));
  if (errorDB) return next(errorDB);

  res.status(200).send(result);
};

const deleteGroup = async (req: GetRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) return next(new Error('ID not found'));

  const [result, errorDB] = await asyncHandler(services.delete(id));
  if (errorDB) return next(errorDB);

  res.status(200).send(result);
};

export default {
  getGroups,
  getGroupById,
  createGroup,
  patchGroup,
  deleteGroup,
};
