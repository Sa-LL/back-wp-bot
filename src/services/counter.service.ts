import { ICounter, PatchRequestBody } from '../types/counter.js';
import counterModel from '../models/counter.model.js';

function createCounter(counter: ICounter) {
  const newCounter = new counterModel(counter);
  return newCounter.save();
}

function getCounter(filters: ICounter, options: Record<string, unknown>) {
  return counterModel.paginate(filters, options);
}

function getCounterByTitle(title: string) {
  return new Promise((resolve, reject) => {
    counterModel
      .findOne({ title: title })
      .exec()
      .then((result) => {
        if (result == null) {
          reject(new Error('Counter not found', { cause: { type: 404 } }));
        }
        resolve(result);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
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
  getByTitle: getCounterByTitle,
  update: updateCounter,
  delete: deleteCounter,
};
