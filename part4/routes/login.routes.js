import { Router } from 'express';
import { getLogin } from '../controllers/login.controller.js';

const router = Router();

router.post('/', getLogin);

export default router;
