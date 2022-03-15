import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user.models.js';

const isValidPassword = async (user, password) => (user === null
  ? false
  : bcrypt.compare(password, user.password));

export const getLogin = async (request, response, next) => {
  const { body } = request;
  const { username, password } = body;

  try {
    const user = await User.findOne({ username });
    const passwordIsCorrect = await isValidPassword(user, password);
    if (!passwordIsCorrect) {
      const errorMessage = { name: 'InvalidLogin', message: 'invalid user or password' };
      throw errorMessage;
    }

    const token = jwt.sign({ userName: user.username, user: user.id }, process.env.SECRET);

    response.send({
      name: user.name,
      userName: user.userName,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default getLogin;
