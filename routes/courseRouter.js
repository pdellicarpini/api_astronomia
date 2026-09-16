import express from 'express';
import CourseController from '../controllers/CourseController.js';

const courseController = new CourseController();

const router = express.Router();

router.post('/', courseController.postCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.delete('/:id', courseController.deleteCourseById);
router.put('/:id', courseController.updateCourseById);

export default router;