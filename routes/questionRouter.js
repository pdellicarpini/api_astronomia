import express from 'express';
import QuestionController from '../controllers/QuestionController.js';

const questionController = new QuestionController();

const router = express.Router();

router.post('/', questionController.postQuestion);
router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestionById);
router.delete('/:id', questionController.deleteQuestionById);
router.put('/:id', questionController.updateQuestionById);

export default router;