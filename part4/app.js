import express from 'express';
import cors from 'cors';
import { PORT } from './utils/config.js';
import blogRouters from './routes/blogs.routes.js';
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(blogRouters);
app.use(unknownEndpoint);
app.use(errorHandler);

app.set('port', PORT);

export default app;
