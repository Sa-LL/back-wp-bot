import { Types } from 'mongoose';
import counterModel, { ICounter } from '../models/counter.model.js';

async function createCounter(counter: ICounter) {
  const newCounter = new counterModel(counter);
  return await newCounter.save();
}

function getCounter(counter: ICounter) {}

function updateCounter(counter: ICounter, id: Types.ObjectId) {}

export default {
  create: createCounter,
  get: getCounter,
  update: updateCounter,
};
