import express from 'express';
import cors from 'cors';
import { PORT } from './utils/config.js';
import blogRouters from './routes/blogs.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(blogRouters);
app.set('port', PORT);

export default app;
