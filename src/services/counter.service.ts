import { Types } from 'mongoose';
import { ICounter } from '../types/counter.js';
import counterModel from '../models/counter.model.js';

function createCounter(counter: ICounter) {
  const newCounter = new counterModel(counter);
  return newCounter.save();
}

function getCounter(filters: ICounter) {
  return counterModel.find(filters).exec();
}

function updateCounter(counter: ICounter, id: Types.ObjectId) {}

export default {
  create: createCounter,
  get: getCounter,
  update: updateCounter,
};
