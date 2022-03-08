import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  let token = '';
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  let decodedToken = {};
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    next(error);
  }

  if (!token || !decodedToken.user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const { user: userId } = decodedToken;
  request.userId = userId;
  // request.decodedToken = decodedToken;
  next();
};

export default userExtractor;
