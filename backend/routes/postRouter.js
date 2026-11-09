import express from 'express';
import PostController from '../controllers/PostController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const post = new PostController();
const router = express.Router();

router.get('/', authMiddleware, post.getPosts);
router.get('/my-comments', authMiddleware, post.getMyComments);
router.get('/:id', authMiddleware, post.getPostById);
router.post('/', authMiddleware, post.postPost);
router.post('/:id/like', authMiddleware, post.toggleLike);
router.post('/:id/comments', authMiddleware, post.postComment);
router.post('/:id/report', authMiddleware, post.reportPost);
router.delete('/:id', authMiddleware, post.deletePost);

export default router;