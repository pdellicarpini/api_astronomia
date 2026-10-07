import userRouter from './userRouter.js';
import questionRouter from './questionRouter.js';
import lessonRouter from './lessonRouter.js';
import authRouter from './authRouter.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const routerAPI = (app) => {
    app.use('/api/users', authMiddleware, roleMiddleware, userRouter);
    app.use('/api/questions', questionRouter);
    app.use('/api/courses', lessonRouter);
    app.use('/api/auth', authRouter);
}

export default routerAPI;