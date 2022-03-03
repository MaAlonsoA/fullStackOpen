import { Router } from 'express';
import { getBlogs, postBlog } from '../controllers/blogs.controllers.js';

const router = Router();

router.get('/api/blogs', getBlogs);
router.post('/api/blogs', postBlog);

export default router;
