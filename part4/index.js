import app from './app.js';
import './database.js';
import * as logger from './utils/logger.js';

app.listen(app.get('port'), () => {
  logger.info(`Server running on port ${app.get('port')}`);
});
