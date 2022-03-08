import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.models.js';

// eslint-disable-next-line import/prefer-default-export
export const getLogin = async (request, response) => {
  const { body } = request;
  const { userName, password } = body;

  const user = await User.findOne({ userName });

  const passwordIsCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password);

  if (!(user && passwordIsCorrect)) {
    return response.status(401).json({ error: 'invalid user or password' });
  }

  const userForToken = {
    userName: user.userName,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return response.send({
    name: user.name,
    userName: user.userName,
    token,
  });
};
