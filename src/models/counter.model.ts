import { PaginateModel, Schema, model } from 'mongoose';
import { ICounter } from '../types/counter.js';
import mongoosePaginate from 'mongoose-paginate-v2';

export enum CounterStatus {
  IN_PROGRESS = 0,
  COMPLETED = 1,
  STOPPED = 2,
}

export const customCounterLabels = {
  totalDocs: 'totalItems',
  docs: 'items',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  meta: 'paginator',
};

export const counterSchema = new Schema<ICounter>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
      enum: CounterStatus,
    },
    completition_date: Date,
    reset_counter: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
).plugin(mongoosePaginate);

const counterModel = model<ICounter, PaginateModel<ICounter>>('Counter', counterSchema);

export default counterModel;
