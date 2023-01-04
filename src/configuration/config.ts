import { config } from 'dotenv';

config();

export default {
  mongodb_uri: process.env.MONGODB_URI || '',
  debug: process.env.DEBUG || false,
};
