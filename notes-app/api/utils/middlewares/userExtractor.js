import jwt from 'jsonwebtoken';

const userExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = '';
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  let decodedToken = {};
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.user) {
      const errorMessage = { name: 'JsonWebTokenError', message: 'perro viejo' };
      throw errorMessage;
    }
  } catch (error) {
    next(error);
  }
  const { user: userId } = decodedToken;
  req.userId = userId;
  next();
};

export default userExtractor;
