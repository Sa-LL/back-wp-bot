import { Model, Schema } from 'mongoose';

const mgTypes = Schema.Types;

export function getModelKeys<T>(model: Model<T>, timeStamps: boolean = true): string[] {
  const propArray = ['_id'];
  if (timeStamps) propArray.push('created_at', 'updated_at');
  for (let prop in model.schema.obj) {
    propArray.push(prop);
  }
  return propArray;
}

export function checkQueryParameters<T>(schema: Schema<T>, query: Partial<T>): Promise<void> {
  for (const queryKey in query)
    if (!schema.path(queryKey)) return Promise.reject(`Field ${queryKey} doesn't exist`);
  return Promise.resolve();
}
