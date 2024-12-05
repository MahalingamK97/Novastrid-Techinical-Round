import express from 'express';
import userController from '../controllers/user.controller';

const UserRouter = express.Router()

UserRouter.post('/create-user', userController.createUser)
UserRouter.get('/login', userController.login);

export default UserRouter;
