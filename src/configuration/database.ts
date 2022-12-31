import mongoose from 'mongoose';
import config from './config.js';
import logger from '../utils/logger.js';

const DB_URI = config.mongodb_uri;

mongoose.Promise = global.Promise;

export const connectDB = () => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      logger.info('Connected to database');
    })
    .catch((error) => {
      logger.error(error);
    });
};

export const closeDB = () => mongoose.connection.close();
