import { Express } from 'express';
import counter from '../components/counter/network.js';

const routes = function (app: Express) {
  app.use('/api', counter);
};

export default routes;
