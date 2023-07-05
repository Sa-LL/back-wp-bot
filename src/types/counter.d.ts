import { Request } from 'express';
import { Types } from 'mongoose';

export interface ICounter {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  message: string;
  count?: number;
  status: Status;
  completition_date?: Date;
  reset_counter?: number;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * GET REQUEST
 */

interface GetRequestQuery extends ICounter {
  page?: number;
  limit?: number;
  sort?: string;
}

/**
 * PATCH REQUEST
 */
interface PatchRequestParams {
  id?: string;
}

export interface PatchRequestBody
  extends Partial<Omit<ICounter, '_id' | 'created_at' | 'updated_at'>> {}

// export type Request = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;

export type GetRequest = Request<{}, {}, {}, GetRequestQuery>;

export type PatchRequest = Request<PatchRequestParams, {}, PatchRequestBody, {}>;
