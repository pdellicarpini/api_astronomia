import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import HomeController from '../controllers/HomeController.js';

const router = Router();
const home = new HomeController();

router.get('/', authMiddleware, home.getHome);

export default router;