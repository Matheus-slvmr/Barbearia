import express from 'express';
import cors from 'cors'; // <-- 1. Importa o CORS
import { usuarioRoutes } from './routes/usuario.routes';
import { agendamentoRoutes } from './routes/agendamento.routes';
import { authRoutes } from './routes/auth.routes';

const app = express();
const port = 3000;

app.use(cors()); // <-- 2. Libera a entrada para o Front-end
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Fala, chefe! O servidor da barbearia está online! 🚀');
});

app.use('/usuarios', usuarioRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`🔥 Servidor rodando lindamente em http://localhost:${port}`);
});