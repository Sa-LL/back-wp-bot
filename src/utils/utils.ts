import { Model } from 'mongoose';

export function getModelKeys<T>(model: Model<T>) {
  for (let prop in model.schema.obj) {
    console.log('prop: ', prop);
  }
}
