import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/user.models.js';

import { getAllUsers, api, closeServer } from './helpers/testHelpers.js';

beforeEach(async () => {
  await User.deleteMany({});

  const passWordHash = await bcrypt.hash('pswd', 10);
  const user = new User({ username: 'root', password: passWordHash, name: 'Marcos' });
  await user.save();
});

describe('GET', () => {
  test('GET users as json', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET all users', async () => {
    const users = await getAllUsers();
    expect(users).toHaveLength(1);
  });
});

describe('POST', () => {
  test('created fresh username', async () => {
    const initialUsers = await getAllUsers();

    const newUser = {
      username: 'Notroot',
      password: '123456',
      name: 'Marcos',
    };

    await api.post('/api/users/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const updatedUsers = await getAllUsers();
    expect(updatedUsers).toHaveLength(initialUsers.length + 1);

    const usernames = updatedUsers.map((elem) => elem.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if user is already taken', async () => {
    const initialUsers = await getAllUsers();

    const newUser = {
      username: 'root',
      password: '123456',
      name: 'Marcos',
    };

    const result = await api.post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error)
      .toContain('User validation failed: username: Error, expected `username` to be unique. Value: `root`');

    const updatedUsers = await getAllUsers();
    expect(updatedUsers).toHaveLength(initialUsers.length);
  });

  test('creation fails with proper statuscode and message if username is to short', async () => {
    const initialUsers = await getAllUsers();

    const newUser = {
      username: 'ro',
      password: '123456',
      name: 'Marcos',
    };

    const result = await api.post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error)
      .toContain('User validation failed: username: User name is to short');

    const updatedUsers = await getAllUsers();
    expect(updatedUsers).toHaveLength(initialUsers.length);
  });
  test('creation fails with proper statuscode and message if password is to short', async () => {
    const initialUsers = await getAllUsers();

    const newUser = {
      username: 'ror',
      password: '12',
      name: 'Marcos',
    };

    const result = await api.post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error)
      .toContain('User validation failed: password: password is to short');

    const updatedUsers = await getAllUsers();
    expect(updatedUsers).toHaveLength(initialUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
  closeServer();
});
