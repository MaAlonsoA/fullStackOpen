import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { PORT, MONGODB_URI } from './utils/config.js';

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(MONGODB_URI)
  .then((result) => {
    console.log('connected to MongoDB', result.connections[0].name);
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
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
  console.log(`Server running on port ${PORT}`);
});
