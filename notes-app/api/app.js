import express from 'express';
import cors from 'cors';

import { PORT } from './utils/config.js';
import userRouters from './routes/user.routes.js';
import noteRouters from './routes/note.routes.js';
import loginRouters from './routes/login.routes.js';
import requestLogger from './utils/middlewares/requestLogger.js';
import { unknownEndpoint, errorHandler } from './utils/middlewares/handleErrors.js';
import connectDB from './database.js';

const app = express();
await connectDB();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/users', userRouters);
app.use('/api/notes', noteRouters);
app.use('/api/login', loginRouters);
app.use(unknownEndpoint);
app.use(errorHandler);

app.set('port', PORT);

export default app;
