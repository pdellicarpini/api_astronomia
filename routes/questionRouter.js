import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const question = new QuestionController();

const router = express.Router();

router.post('/', question.postQuestion);
router.get('/', question.getQuestions);
router.get('/:id', question.getQuestionById);
router.delete('/:id', question.deleteQuestionById);
router.put('/:id', question.updateQuestionById);

export default router;