import { Schema, model, Types } from 'mongoose';
import { ICounter } from '../types/counter.js';

enum Status {
  IN_PROGRESS = 0,
  COMPLETED = 1,
  STOPPED = 2,
}

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
    count: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
      enum: Status,
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
);

const counterModel = model<ICounter>('Counter', counterSchema);

export default counterModel;
