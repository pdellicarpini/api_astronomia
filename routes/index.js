import userRouter from './userRouter.js';
import questionRouter from './questionRouter.js';
import courseRouter from './courseRouter.js';
import authRouter from './authRouter.js';

const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/questions', questionRouter);
    app.use('/api/courses', courseRouter);
    app.use('/api/auth', authRouter);
}

export default routerAPI;