import express from 'express';
import LessonController from '../controllers/LessonController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const lesson = new LessonController();

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware, lesson.postLesson);
router.get('/', lesson.getLessons);
router.get('/:id', lesson.getLessonById);
router.delete('/:id', authMiddleware, roleMiddleware, lesson.deleteLessonById);
router.put('/:id', authMiddleware, roleMiddleware, lesson.updateLessonById);

export default router;