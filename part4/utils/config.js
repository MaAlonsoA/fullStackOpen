import 'dotenv/config';

export const { PORT } = process.env || 3001;
// eslint-disable-next-line import/no-mutable-exports
export let { MONGODB_URI } = process.env;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}
