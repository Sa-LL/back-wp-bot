import { Types } from 'mongoose';

export interface IOptions {
  is_random?: boolean;
  reading_type?: number;
  date?: string;
}

export interface IMessage {
  _id?: Types.ObjectId;
  trigger: string;
  message: string | string[];
  options?: IOptions;
  created_at?: Date;
  updated_at?: Date;
}
