import 'dotenv/config';

const { PORT } = process.env || 3001;
const { MONGODB_URI } = process.env;

export {
  PORT,
  MONGODB_URI,
};
