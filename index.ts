import express from 'express';
import cors from 'cors';
import { connectDB } from './src/configuration/database.js';
import logger from './src/utils/logger.js';
// import routes from './src/network/routes.js';
import routes from './src/routes/index.router.js';

const app = express();

const PORT = process.env.PORT || 8080;

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
