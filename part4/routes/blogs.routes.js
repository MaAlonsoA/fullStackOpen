import { Router } from 'express';
import {
  getBlogs, postBlog, deleteBlog, updateBlog,
} from '../controllers/blogs.controllers.js';
import userExtractor from '../utils/middlewares/userExtractor.js';

const router = Router();

router.get('/', getBlogs);
router.post('/', userExtractor, postBlog);
router.delete('/:id', userExtractor, deleteBlog);
router.put('/:id', userExtractor, updateBlog);

export default router;
