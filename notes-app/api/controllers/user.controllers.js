import User from '../models/user.models.js';

// eslint-disable-next-line import/prefer-default-export
export const getUsers = async (req, res, next) => {
  try {
    const usersFound = await User.find({});
    res.status(200).json(usersFound);
  } catch (e) {
    next(e);
  }
};
