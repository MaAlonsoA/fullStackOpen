import * as logger from '../logger.js';

const requestLogger = (request, response, next) => {
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

export default requestLogger;
