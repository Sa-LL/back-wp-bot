import { Types } from 'mongoose';
import counterModel, { ICounter } from '../models/counter.model.js';

function createCounter(counter: ICounter) {
  const newCounter = new counterModel(counter);
  return newCounter.save();
}

function getCounter() {
  return counterModel.find();
}

function updateCounter(counter: ICounter, id: Types.ObjectId) {}

export default {
  create: createCounter,
  get: getCounter,
  update: updateCounter,
};
