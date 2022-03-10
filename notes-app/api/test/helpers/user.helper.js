import bcrypt from 'bcrypt';
import * as logger from '../../utils/logger.js';

const initialUsers = [
  {
    username: 'root',
    name: 'Marcos',
    password: 'root',
  },
  {
    username: 'test',
    name: 'tester',
    password: 'testpwd',
  },
];

export const getAllUsers = async () => {
  try {
    const usersInDb = await User.find({});
    return usersInDb.map((elem) => elem.toSJON());
  } catch (e) {
    logger.error(e);
  }
  return null;
};

const wipeUsers = async () => {
  try {
    await User.deletemanu({});
  } catch (e) {
    logger.error(e);
  }
};

export const initUsers = async () => {
  wipeUsers();
  // eslint-disable-next-line no-restricted-syntax
  for await (const elem of initialUsers) {
    elem.password = bcrypt.hash(elem.password, 10);
    const newUser = new User(elem);
    newUser.save();
  }
};
