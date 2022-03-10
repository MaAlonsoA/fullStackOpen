import bcrypt from 'bcrypt';

import { api } from './test.helpers.js';
import User from '../../models/user.models.js';

export const initialUsers = [
  {
    username: 'root1',
    name: 'Marcos',
    password: 'eladmin',
  },
  {
    username: 'test',
    name: 'ertesst',
    password: 'notroot',
  }];

const wipeUsers = async () => {
  await User.deleteMany();
};

export const initUsers = async () => {
  await wipeUsers();
  // eslint-disable-next-line no-restricted-syntax
  for await (const elem of initialUsers) {
    elem.password = await bcrypt.hash(elem.password, 10);
    const newUser = new User(elem);
    await newUser.save();
  }
};

export const getAllUsers = async () => {
  const usersInDb = await api.get('/api/users');
  return usersInDb.map((elem) => elem.toJSON());
};
