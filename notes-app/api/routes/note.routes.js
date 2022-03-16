import { Router } from 'express';

import {
  deleteNote, getNotes, getNote, postNote, updateNote,
} from '../controllers/note.controllers.js';
import userExtractor from '../utils/middlewares/userExtractor.js';

const router = Router();

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', userExtractor, postNote);
router.delete('/:id', userExtractor, deleteNote);
router.put('/:id', userExtractor, updateNote);

export default router;
