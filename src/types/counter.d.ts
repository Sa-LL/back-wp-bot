import { Request } from 'express';
import { Types } from 'mongoose';

export interface ICounter {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  count?: number;
  status: Status;
  completition_date?: Date;
  reset_counter?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery extends ICounter {}

export type GetRequest = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;
