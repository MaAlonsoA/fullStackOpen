import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user.models.js';

export const getLogin = async (request, response) => {
  const { body } = request;
  const { username, password } = body;

  const user = await User.findOne({ username });

  const passwordIsCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password);

  if (!(user && passwordIsCorrect)) {
    return response.status(401).json({ error: 'invalid user or password' });
  }

  const userForToken = {
    userName: user.username,
    user: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return response.send({
    name: user.name,
    userName: user.userName,
    token,
  });
};

export default getLogin;
