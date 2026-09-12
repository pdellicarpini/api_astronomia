import express from 'express';
import UserController from '../controllers/UserController.js';

const userController = new UserController();

const router = express.Router();

router.post('/', userController.postUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUserById);
router.put('/:id', userController.updateUserById);

export default router;