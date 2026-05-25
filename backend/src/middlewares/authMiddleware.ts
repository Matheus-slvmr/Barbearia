import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // 1. O segurança olha para o cabeçalho (header) do pedido buscando a Autorização
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ erro: '🛑 Acesso negado! Cadê o seu crachá (Token)?' });
    return;
  }

  // O padrão da internet é enviar o crachá assim: "Bearer eyJhbG..." 
  // Então nós cortamos o texto no espaço e pegamos só a parte do código
  const [, token] = authHeader.split(' ');

  try {
    // 2. O segurança passa o crachá na máquina para ver se é válido
    jwt.verify(token, 'segredo_super_seguro_da_barbearia');
    
    // 3. Se a máquina apitar verde, ele abre a porta!
    next();
  } catch (error) {
    // Se o crachá for falso ou estiver vencido, ele barra.
    res.status(401).json({ erro: '🛑 Crachá falso ou vencido! Token inválido.' });
    return;
  }
}