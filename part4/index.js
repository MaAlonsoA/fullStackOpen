import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { PORT, MONGODB_URI } from './utils/config.js';
import * as logger from './utils/logger.js';
import Blog from './models/blog.js';

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

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
