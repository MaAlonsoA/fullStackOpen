// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';

import server from '../../index.js';

export const api = supertest(server);
export const closeServer = () => server.close();
