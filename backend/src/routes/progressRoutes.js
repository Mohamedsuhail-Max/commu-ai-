import { Router } from 'express';
import { getWeekly, getMonthly } from '../controllers/progressController.js';

const router = Router();

router.get('/weekly', getWeekly);
router.get('/monthly', getMonthly);

export default router;
