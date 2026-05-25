import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class AgendamentoController {
  async criar(req: Request, res: Response) {
    try {
      const { data, hora, servico, clienteId, barbeiroId } = req.body;

      // O Prisma vai lá no Supabase e cria a ligação perfeita
      const novoAgendamento = await prisma.agendamento.create({
        data: {
          data,
          hora,
          servico,
          clienteId,
          barbeiroId,
          status: 'pendente' // Todo agendamento nasce pendente
        }
      });

      res.status(201).json(novoAgendamento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar o agendamento' });
    }
  }
}