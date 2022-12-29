import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './database/database.js';
import logger from '../logger/logger.js';
import routes from './network/routes.js';

const app: Express = express();

const PORT = process.env.PORT || 8080;

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
routes(app);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
