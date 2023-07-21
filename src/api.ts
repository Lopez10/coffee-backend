import { Router } from 'express';
import { userRouter } from './modules/User/restAPI/route/createUser.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/users', userRouter);

export { router };
