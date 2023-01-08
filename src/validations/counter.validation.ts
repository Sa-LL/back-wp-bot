import { CounterStatus } from '../models/counter.model.js';
import yup from 'yup';

const title = yup.string().trim().min(3).max(20);
const description = yup.string().trim();
const count = yup.number().integer();
const status = yup.mixed<CounterStatus>().oneOf(Object.values(CounterStatus) as number[]);
const completition_date = yup.date();
const reset_counter = yup.number().integer();

const createCounterSchemaYUP = yup.object({
  title: title.required(),
  description: description.default(''),
  count: count.default(0),
  status: status.required().default(0),
  completition_date,
  reset_counter: reset_counter.default(0),
});

const patchCounterSchemaYUP = yup.object({
  title,
  description,
  count,
  status,
  completition_date,
  reset_counter,
});

export default {
  createCounterSchemaYUP,
  patchCounterSchemaYUP,
};
