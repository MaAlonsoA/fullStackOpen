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
    const { response } = await getAllUsers();
    expect(response.body).toHaveLength(initialUsers.length);
  });
});

describe('POST', () => {
  test('POST fresh user', async () => {
    const newUser = { username: 'fresh2', password: '123456', name: 'newnew' };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { response, usernames } = await getAllUsers();
    expect(response.body).toHaveLength(initialUsers.length + 1);
    expect(usernames).toContain(newUser.username);
  });

  test('POST fails with proper status code abd nessage if user is already taken', async () => {
    const newUser = initialUsers[0];

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error)
      .toContain('User validation failed: username: Error, expected `username` to be unique. Value: `root`');

    const { response } = await getAllUsers();
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test('POST fails with proper statuscode and message if username is to short', async () => {
    const newUser = { username: 'fr', password: '123456', name: 'newnew' };

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error)
      .toContain('User validation failed: username: User name is to short');

    const { response, usernames } = await getAllUsers();
    expect(response.body).toHaveLength(initialUsers.length);
    expect(usernames).not.toContain(newUser.username);
  });

  test('POST fails with proper statuscode and message if password is to short', async () => {
    const newUser = { username: 'freshUser', password: '12', name: 'newnew' };

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error)
      .toContain('User validation failed: password: password is to short');

    const { response, usernames } = await getAllUsers();
    expect(response.body).toHaveLength(initialUsers.length);
    expect(usernames).not.toContain(newUser.username);
  });
});
afterAll(() => {
  mongoose.connection.close();
  closeServer();
});
