import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const authRoutes = Router();
const authController = new AuthController();

// A rota será POST /login
authRoutes.post('/login', authController.login);

export { authRoutes };