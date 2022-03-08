import mongoose from 'mongoose';

import Blog from '../models/blog.models.js';
import {
  blogs, api, getAllContent, closeServer,
} from './helpers/testHelpers.js';

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
  test('the unique identifier is "id" ', async () => {
    const { contents } = await getAllContent();
    contents.forEach((elem) => {
      expect(elem.id).toBeDefined();
    });
  });
  describe('GET', () => {
    test('GET blogs as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('GET all blogs', async () => {
      // const response = await api.get('/api/blogs');
      // const content = response.body.map((elem) => elem);
      const { contents } = await getAllContent();
      expect(contents).toHaveLength(blogs.length);
    });
  });
  describe('POST', () => {
    test('POST a valid blog', async () => {
      const newBlog = {
        title: 'Go To Statement Considered Harmful2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
      };
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const { contents } = await getAllContent();

      const titles = contents.map((elem) => elem.title);
      expect(contents).toHaveLength(blogs.length + 1);
      expect(titles).toContain(newBlog.title);
    });

    test('POST without like property it will default to 0', async () => {
      const newBlog = {
        title: 'Go To Statement Considered Harmful2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      };

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const { contents } = await getAllContent();
      expect(contents).toHaveLength(blogs.length + 1);
      contents.forEach((elem) => {
        if (elem.title === newBlog.title) expect(elem.likes).toBe(0);
      });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
  closeServer();
});