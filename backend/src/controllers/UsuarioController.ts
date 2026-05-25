import { Request, Response } from 'express';
import { prisma } from '../prisma';
import bcrypt from 'bcryptjs'; // <-- Importamos a ferramenta aqui

export class UsuarioController {
  async criar(req: Request, res: Response) {
    try {
      const { nome, telefone, email, senha, perfil } = req.body;

      // 1. Criptografando a senha (o número 10 é o "custo" do cálculo, padrão seguro da indústria)
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // 2. Salvando no banco de dados com a senha embaralhada
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          telefone,
          email,
          senha: senhaCriptografada, // <-- Passamos a variável segura aqui!
          perfil: perfil || 'CLIENTE'
        }
      });

      // 3. Devolvemos os dados criados (o ideal é não devolver a senha, mesmo criptografada, por segurança)
      res.status(201).json({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        perfil: novoUsuario.perfil,
        criadoEm: novoUsuario.criadoEm
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar o usuário' });
    }
  }
}