import { Router } from 'express';
import { getVocabulary, createVocabulary } from '../controllers/vocabularyController.js';
import { validateBody } from '../middleware/validateRequest.js';

const router = Router();

router.get('/', getVocabulary);
router.post('/', validateBody(['word', 'definition']), createVocabulary);

export default router;
