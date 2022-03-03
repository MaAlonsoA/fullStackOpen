import app from './app.js';
import * as Logger from './utils/logger.js';

app.listen(app.get('port'), () => {
  Logger.info(`Server running on port ${app.get('port')}`);
});
