import { Router } from 'express';
import {
  getBlogs, postBlog, deleteBlog, updateBlog,
} from '../controllers/blogs.controllers.js';

const router = Router();

router.get('/api/blogs', getBlogs);
router.post('/api/blogs', postBlog);
router.delete('/api/blogs/:id', deleteBlog);
router.put('/api/blogs/:id', updateBlog);

export default router;
