import userRouter from './userRouter.js';
import questionRouter from './questionRouter.js';
import lessonRouter from './lessonRouter.js';
import levelRouter from './levelRouter.js';
import postRouter from './postRouter.js';
import authRouter from './authRouter.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/questions', questionRouter);
    app.use('/api/lessons', lessonRouter);
    app.use('/api/levels', levelRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/posts', postRouter)
}

export default routerAPI;