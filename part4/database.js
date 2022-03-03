import mongoose from 'mongoose';
import { MONGODB_URI } from './utils/config.js';
import * as logger from './utils/logger.js';

mongoose.connect(MONGODB_URI)
  .then((result) => {
    logger.info('connected to MongoDB', result.connections[0].name);
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });
