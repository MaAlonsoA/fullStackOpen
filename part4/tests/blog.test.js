import mongoose from 'mongoose';

import Blog from '../models/blog.models.js';
import User from '../models/user.models.js';
import * as logger from '../utils/logger.js';
import {
  blogs, api, getAllContent, closeServer,
} from './helpers/testHelpers.js';

let headers = {};

beforeEach(async () => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});
  } catch (error) {
    logger.error(error);
  }
  const newUser = {
    userName: 'root',
    password: '1234556',
    name: 'Marcos',
  };

  await api
    .post('/api/users')
    .send(newUser);

  const result = await api
    .post('/api/login')
    .send(newUser);

  headers = {
    Authorization: `bearer ${result.body.token}`,
  };

  // parallel
  // const blogObjects = blogs.map((elem) => new Blog(elem));
  // const promises = blogObjects.map((elem) => elem.save());
  // await Promise.all(promises);

  // sequential
  // eslint-disable-next-line no-restricted-syntax
  for (const elem of blogs) {
    // eslint-disable-next-line no-await-in-loop
    await api.post('/api/blogs')
      .send(elem)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/);
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
        .set(headers)
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
        .set(headers)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const { contents } = await getAllContent();
      expect(contents).toHaveLength(blogs.length + 1);
      contents.forEach((elem) => {
        if (elem.title === newBlog.title) expect(elem.likes).toBe(0);
      });
    });

    test('POST without tittle return 400', async () => {
      const newBlog = {
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
      };

      await api.post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('POST without autor return 400', async () => {
      const newBlog = {
        title: 'Go To Statement Considered Harmful2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
      };

      await api.post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('POST without url return 400', async () => {
      const newBlog = {
        title: 'Go To Statement Considered Harmful2',
        author: 'Edsger W. Dijkstra',
        likes: 0,
      };

      await api.post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });
  describe('DELETE', () => {
    test('DELETE by id', async () => {
      const { contents: initialContents } = await getAllContent();
      const blogToDelete = initialContents[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set(headers)
        .expect(204);

      const { contents: updatedContents } = await getAllContent();
      expect(updatedContents).toHaveLength(blogs.length - 1);

      const titles = updatedContents.map((elem) => elem.title);
      expect(titles).not.toContain(blogToDelete.title);
    });
  });
  describe('PUT', () => {
    test('PUT update a note by id', async () => {
      const { contents: initialContents } = await getAllContent();
      const blogToUpdate = initialContents[0];
      blogToUpdate.likes = Math.floor(Math.random() * (20 - 0)) + 0;

      await api.put(
        `/api/blogs/${blogToUpdate.id}`,
      ).send(blogToUpdate)
        .set(headers)
        .expect(200);

      const { contents: updatedContents } = await getAllContent();
      expect(updatedContents[0].likes).toEqual(blogToUpdate.likes);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
  closeServer();
});
