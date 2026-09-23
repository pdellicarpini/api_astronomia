import express from 'express';
import CourseController from '../controllers/CourseController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const courseController = new CourseController();

const router = express.Router();

router.post('/', authMiddleware, courseController.postCourse);
router.get('/', authMiddleware, courseController.getCourses);
router.get('/:id', authMiddleware, courseController.getCourseById);
router.delete('/:id', authMiddleware, courseController.deleteCourseById);
router.put('/:id', authMiddleware, courseController.updateCourseById);

export default router;