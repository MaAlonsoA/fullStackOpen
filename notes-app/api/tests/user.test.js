import mongoose from 'mongoose';
import { api, closeServer } from './helpers/test.helpers.js';
import { getAllUsers, initialUsers, initUsers } from './helpers/user.helpers.js';

beforeEach(async () => {
  await initUsers();
});

describe('GET', () => {
  test('GET users as JSON', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET all users', async () => {
    const usersInDb = await getAllUsers();
    expect(usersInDb).toHaveLength(initialUsers.length);
  });
});
afterAll(() => {
  mongoose.connection.close();
  closeServer();
});
