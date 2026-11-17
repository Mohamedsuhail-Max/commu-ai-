import { Router } from 'express';
import { checkGrammar } from '../controllers/grammarController.js';
import { validateBody } from '../middleware/validateRequest.js';

const router = Router();

router.post('/check', validateBody(['sentence']), checkGrammar);

export default router;
