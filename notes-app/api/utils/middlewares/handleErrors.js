import * as logger from '../logger.js';

const ERROR_HANDLERS = {
  CastError: (response) => response.status(400).send({ error: 'malformatted id' }),
  ValidationError: (response, error) => response.status(400).json({ error: error.message }),
  JsonWebTokenError: (response) => response.status(401).json({ error: 'invalid token' }),
  defaultError: (res, error) => {
    logger.error('dad', error);
    res.status(500).json(error);
  },
};

export const requestLogger = (request, response, next) => {
  logger.info(
    ' Method:',
    request.method,
    '\n',
    'Path:  ',
    request.path,
    '\n',
    'Body:  ',
    request.body,
    '\n',
    '---',
  );
  next();
};

export const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(response, error, next);
};
