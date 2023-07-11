interface IContactID {
  server: string;
  user: string;
  _serialized: string;
}

interface IGroupParticipant {
  participant_id: IContactID;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

export interface IGroup {
  _id?: string;
  group_id: IContactID;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  participants: IGroupParticipant[];
}

/**
 * GET REQUEST
 */
interface GetRequestQuery extends IGroup {
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
  extends Partial<Omit<IGroup, '_id' | 'created_at' | 'updated_at'>> {}

// export type Request = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;

export type GetRequest = Request<{}, {}, {}, GetRequestQuery>;

export type PatchRequest = Request<PatchRequestParams, {}, PatchRequestBody, {}>;
