import bcrypt from 'bcrypt';
import User from '../models/user.models.js';

export const getUsers = async (request, response, next) => {
  try {
    const usersFound = await User.find({});
    response.status(200).json(usersFound);
  } catch (error) {
    next(error);
  }
};

export const postUser = async (request, response, next) => {
  const { body } = request;
  const passWordHash = await bcrypt.hash(body.password, 10);
  if (body.password.length < 3) response.status(400).json({ error: 'User validation failed: password: password is to short' });

  const newUser = new User({
    userName: body.userName,
    password: passWordHash,
    name: body.name,
  });
  try {
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};
