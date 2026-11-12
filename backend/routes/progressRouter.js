import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import UserProgressController from '../controllers/UserProgressController.js';

const router = Router();
const progress = new UserProgressController();

router.post('/', authMiddleware, progress.completeLesson);

export default router;