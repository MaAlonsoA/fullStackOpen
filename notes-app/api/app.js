import express from 'express';
import cors from 'cors';
import './database.js';

import { PORT } from './utils/config.js';
import userRouters from './routes/user.routes.js';
import requestLogger from './utils/middlewares/requestLogger.middlewares.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/users', userRouters);
app.set('port', PORT);

export default app;
