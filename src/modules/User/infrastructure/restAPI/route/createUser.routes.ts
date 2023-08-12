import { Router } from 'express';
import { CreateUserController } from '../controller/createUser.controller';

const userRouter = Router();

userRouter.post('/', (req, res) => {
  new CreateUserController().execute(req, res);
});

userRouter.get('/', (req, res) => {
  res.send('Hello Users!');
});

export { userRouter };
