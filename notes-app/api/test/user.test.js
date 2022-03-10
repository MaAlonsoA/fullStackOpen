import mongoose from 'mongoose';

import { api, closeServer } from './helpers/test.helper.js';
import { getAllUsers, initUsers } from './helpers/user.helper.js';

beforeEach(async () => {
  initUsers();
});

describe('GET', () => {
  test('GET users as JSON', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET all users', async () => {
    const usersInDb = await getAllUsers();
    expect(usersInDb).toHaveLength(1);
  });
});

afterAll(() => {
  mongoose.connection.close();
  closeServer();
});
