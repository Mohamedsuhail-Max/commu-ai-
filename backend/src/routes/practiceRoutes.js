import { Router } from 'express';
import { listPracticeHistory, startPracticeSession } from '../controllers/practiceController.js';
import { validateBody } from '../middleware/validateRequest.js';

const router = Router();

router.get('/history', listPracticeHistory);
router.post('/session', validateBody(['topic']), startPracticeSession);

export default router;
