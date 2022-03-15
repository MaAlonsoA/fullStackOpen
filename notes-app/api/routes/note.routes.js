import { Router } from 'express';

import { getNotes, postNote } from '../controllers/note.controllers.js';
import userExtractor from '../utils/middlewares/userExtractor.js';

const router = Router();

router.get('/', getNotes);
router.post('/', userExtractor, postNote);

export default router;
