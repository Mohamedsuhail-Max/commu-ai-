import { Router } from 'express';
import { handleInterviewSession } from '../controllers/interviewController.js';
import { validateBody } from '../middleware/validateRequest.js';

const router = Router();

router.post('/session', validateBody(['question', 'answer']), handleInterviewSession);

export default router;
