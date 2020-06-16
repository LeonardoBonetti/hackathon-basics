import express from 'express';
import AuthController from './Controllers/AuthController';

const routes = express.Router();
const authController = new AuthController();

routes.post('/auth/register', authController.Register);
routes.post('/auth/login', authController.Login);


export default routes;