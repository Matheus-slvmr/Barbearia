import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

// Quando alguém acessar POST /usuarios, chama a função "criar" do controlador
usuarioRoutes.post('/', usuarioController.criar);

export { usuarioRoutes };