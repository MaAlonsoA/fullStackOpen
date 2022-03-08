import * as logger from './logger.js';

export const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

export const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  }

  next(error);
};