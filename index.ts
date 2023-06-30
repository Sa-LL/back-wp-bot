import express from 'express';
import cors from 'cors';
import { connectDB } from './src/configuration/database.js';
import logger from './src/utils/logger.js';
import responseMiddleware from './src/middleware/response.middleware.js';
import routes from './src/routes/index.router.js';
import swaggerDocs from './src/swagger/swagger.js';

const app = express();

const PORT = process.env.PORT || 8080;

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(responseMiddleware.errorLogs);
app.use(responseMiddleware.errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  swaggerDocs(app, PORT);
});
