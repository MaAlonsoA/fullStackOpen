import app from './app.js';
import * as logger from './utils/logger.js';

export default app.listen(app.get('port'), () => {
  logger.info(`Server running on port ${app.get('port')}`);
});
