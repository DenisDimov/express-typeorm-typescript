import express from 'express';
import { errors } from 'celebrate';
import swaggerUi from 'swagger-ui-express';

import router from './routes/index.route';
import errorHandler from './middlewares/ErrorHandlerMiddleware';
import config from './config/index';
import swaggerDocument from './swagger/openapi.json';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(config.ApiPrefix, router);
app.use(errors());
app.use(errorHandler);

export default app;
