import mongoose from 'mongoose';
import {
  MONGO_DB_URI, MONGO_DB_URI_TEST, MONGO_DB_URI_DEV, NODE_ENV,
} from './utils/config.js';
import * as logger from './utils/logger.js';

let connectionString;

if (NODE_ENV === 'production') {
  connectionString = MONGO_DB_URI;
} else if (NODE_ENV === 'development') {
  connectionString = MONGO_DB_URI_DEV;
} else if (NODE_ENV === 'test') {
  connectionString = MONGO_DB_URI_TEST;
}

mongoose.connect(connectionString)
  .then((result) => {
    logger.info('connected to MongoDB', result.connections[0].name);
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });
