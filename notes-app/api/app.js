import express from 'express';
import cors from 'cors';
import './database.js';

import { PORT } from './utils/config.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});
app.set('port', PORT);

export default app;
