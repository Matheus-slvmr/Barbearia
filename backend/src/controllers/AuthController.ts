import { Request, Response } from 'express';
import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body;

      // 1. Busca o usuário pelo email
      const usuario = await prisma.usuario.findUnique({
        where: { email }
      });

      // Se não achar o usuário, barra a entrada
      if (!usuario) {
        res.status(401).json({ erro: 'Email ou senha incorretos' });
        return;
      }

      // 2. Compara a senha digitada com a senha criptografada do banco
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        res.status(401).json({ erro: 'Email ou senha incorretos' });
        return;
      }

      // 3. Gera o Crachá (Token)
      // Nota: Em produção, essa "chave_secreta" deve ir para o arquivo .env
      const token = jwt.sign(
        { id: usuario.id, perfil: usuario.perfil }, 
        'segredo_super_seguro_da_barbearia', 
        { expiresIn: '1d' } // O crachá vale por 1 dia
      );

      // 4. Devolve o usuário (sem a senha) e o Token!
      res.json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          perfil: usuario.perfil
        },
        token
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao fazer login' });
    }
  }
}