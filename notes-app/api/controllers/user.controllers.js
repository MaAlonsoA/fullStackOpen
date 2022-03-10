import bcrypt from 'bcrypt';

import User from '../models/user.models.js';

export const getUsers = async (req, res, next) => {
  try {
    const usersFound = await User.find({});
    res.status(200).json(usersFound);
  } catch (e) {
    next(e);
  }
};

export const postUser = async (req, res, next) => {
  const { username, name, password } = req.body;
  if (password.length < 3) res.status(400).json({ error: 'User validation failed: password: password is to short' });
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: passwordHash, name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
};
