import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import userRoutes from './userRoutes.js';
import practiceRoutes from './practiceRoutes.js';
import grammarRoutes from './grammarRoutes.js';
import vocabularyRoutes from './vocabularyRoutes.js';
import interviewRoutes from './interviewRoutes.js';
import progressRoutes from './progressRoutes.js';
import chatRoutes from './chatRoutes.js';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/practice', practiceRoutes);
apiRouter.use('/grammar', grammarRoutes);
apiRouter.use('/vocabulary', vocabularyRoutes);
apiRouter.use('/interview', interviewRoutes);
apiRouter.use('/progress', progressRoutes);
apiRouter.use('/chat', chatRoutes);

export default apiRouter;
