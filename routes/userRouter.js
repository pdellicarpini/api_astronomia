import express from 'express';
import UserController from '../controllers/UserController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const user = new UserController();

const router = express.Router();

router.post('/', user.postUser);
router.get('/', user.getUsers);
router.get('/:id', user.getUserById);
router.delete('/:id', user.deleteUserById);
router.put('/:id', user.updateUserById);
router.post('/profile-image', uploadMiddleware.single('profileImage'), user.uploadProfileImage);

export default router;