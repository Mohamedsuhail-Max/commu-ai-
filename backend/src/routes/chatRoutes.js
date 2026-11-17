import { Router } from 'express';
import { handleChatMessage } from '../controllers/chatController.js';
import { validateBody } from '../middleware/validateRequest.js';

const router = Router();

router.post('/', validateBody(['message']), handleChatMessage);

export default router;
