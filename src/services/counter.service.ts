import { ICounter, PatchRequestBody } from '../types/counter.js';
import counterModel from '../models/counter.model.js';

function createCounter(counter: ICounter) {
  const newCounter = new counterModel(counter);
  return newCounter.save();
}

function getCounter(filters: ICounter) {
  return counterModel.find(filters).exec();
}

function getCounterByID(id: string) {
  return counterModel.findById(id).exec();
}

function updateCounter(id: string, counter: PatchRequestBody) {
  return counterModel.findByIdAndUpdate(id, counter, { new: true }).exec();
}

function deleteCounter(id: string) {
  return counterModel.findByIdAndDelete(id).exec();
}

export default {
  create: createCounter,
  get: getCounter,
  getByID: getCounterByID,
  update: updateCounter,
  delete: deleteCounter,
};
