import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { PORT, MONGODB_URI } from './utils/config.js';
import * as logger from './utils/logger.js';
import blogRouters from './routes/blogs.routes.js';

const app = express();

mongoose.connect(MONGODB_URI)
  .then((result) => {
    logger.info('connected to MongoDB', result.connections[0].name);
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(blogRouters);
app.set('port', PORT);

export default app;
