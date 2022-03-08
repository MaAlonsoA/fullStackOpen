import { Router } from 'express';
import {
  getBlogs, postBlog, deleteBlog, updateBlog,
} from '../controllers/blogs.controllers.js';

const router = Router();

router.get('/', getBlogs);
router.post('/', postBlog);
router.delete('/:id', deleteBlog);
router.put('/:id', updateBlog);

export default router;
