import { Router } from 'express';

import { getNotes, postNote } from '../controllers/note.controllers.js';

const router = Router();

router.get('/', getNotes);
router.post('/', postNote);

export default router;
