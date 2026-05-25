import { Router } from 'express';
import { AgendamentoController } from '../controllers/AgendamentoController';
import { authMiddleware } from '../middlewares/authMiddleware'; // <-- Importamos o segurança

const agendamentoRoutes = Router();
const agendamentoController = new AgendamentoController();

// Colocamos o "authMiddleware" BEM NO MEIO, antes de chamar o controlador!
agendamentoRoutes.post('/', authMiddleware, agendamentoController.criar);

export { agendamentoRoutes };