import express from 'express';
import PostController from '../controllers/PostController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const post = new PostController();
const router = express.Router();

router.post('/', authMiddleware, post.postPost);
router.get('/', post.getPosts);
router.get('/:id', post.getPostById);

export default router;