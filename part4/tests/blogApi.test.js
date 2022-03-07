import mongoose from 'mongoose';
import supertest from 'supertest';

import server from '../index.js';
import Blog from '../models/blog.models.js';
import { blogs } from './helpers/testHelpers.js';

const api = supertest(server);

beforeEach(async () => {
  await Blog.deleteMany({});

  // parallel
  // const blogObjects = blogs.map((elem) => new Blog(elem));
  // const promises = blogObjects.map((elem) => elem.save());
  // await Promise.all(promises);

  // sequential
  // eslint-disable-next-line no-restricted-syntax
  for (const elem of blogs) {
    const newBlog = new Blog(elem);
    // eslint-disable-next-line no-await-in-loop
    await newBlog.save();
  }
});

describe('blog info', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
  });

  test('the unique identifier is "id" ', async () => {
    const content = await Blog.find({});
    content.forEach((elem) => {
      expect(elem.id).toBeDefined();
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
