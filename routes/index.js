import userRouter from './userRouter.js';
import questionRouter from './questionRouter.js';
import courseRouter from './courseRouter.js';

const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/questions', questionRouter);
    app.use('/api/courses', courseRouter);
}

export default routerAPI;