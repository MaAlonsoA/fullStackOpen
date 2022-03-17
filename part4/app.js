import express from 'express';
import cors from 'cors';

import { PORT } from './utils/config.js';
import connectDB from './database.js';
import blogRouters from './routes/blogs.routes.js';
import userRouters from './routes/users.routes.js';
import loginRouters from './routes/login.routes.js';
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middlewares/handleErrors.js';

const app = express();
await connectDB();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/blogs', blogRouters);
app.use('/api/users', userRouters);
app.use('/api/login', loginRouters);
app.use(unknownEndpoint);
app.use(errorHandler);

app.set('port', PORT);

export default app;
