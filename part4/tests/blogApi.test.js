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

describe('blog API', () => {
  test('GET blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET all blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
  });

  test('the unique identifier is "id" ', async () => {
    const content = await Blog.find({});
    content.forEach((elem) => {
      expect(elem.id).toBeDefined();
    });
  });

  test('POST a valid blog', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
    };
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const titles = response.body.map((elem) => elem.title);

    expect(response.body).toHaveLength(blogs.length + 1);
    expect(titles).toContain('Go To Statement Considered Harmful');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
