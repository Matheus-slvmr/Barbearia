// Tipos de dados
export interface Barbeiro {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  especialidades: string[];
  foto?: string;
}

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
}

export interface Agendamento {
  id: string;
  clienteId: string;
  barbeiroId: string;
  data: string;
  hora: string;
  servico: string;
  status: "confirmado" | "pendente" | "concluido" | "cancelado";
  notificacaoEnviada?: boolean;
}

// Dados iniciais de exemplo
const dadosIniciais = {
  barbeiros: [
    {
      id: "1",
      nome: "Carlos Silva",
      telefone: "(11) 98765-4321",
      email: "carlos@barberpro.com",
      especialidades: ["Corte Clássico", "Barba", "Degradê"],
    },
    {
      id: "2",
      nome: "João Santos",
      telefone: "(11) 98765-4322",
      email: "joao@barberpro.com",
      especialidades: ["Corte Moderno", "Pigmentação", "Design"],
    },
  ] as Barbeiro[],
  clientes: [
    {
      id: "1",
      nome: "Pedro Oliveira",
      telefone: "(11) 99876-5432",
      email: "pedro@email.com",
    },
    {
      id: "2",
      nome: "Lucas Ferreira",
      telefone: "(11) 99876-5433",
      email: "lucas@email.com",
    },
    {
      id: "3",
      nome: "Rafael Costa",
      telefone: "(11) 99876-5434",
      email: "rafael@email.com",
    },
  ] as Cliente[],
  agendamentos: [
    {
      id: "1",
      clienteId: "1",
      barbeiroId: "1",
      data: "2026-04-17",
      hora: "10:00",
      servico: "Corte + Barba",
      status: "confirmado" as const,
      notificacaoEnviada: true,
    },
    {
      id: "2",
      clienteId: "2",
      barbeiroId: "2",
      data: "2026-04-17",
      hora: "14:00",
      servico: "Corte",
      status: "pendente" as const,
      notificacaoEnviada: false,
    },
  ] as Agendamento[],
};

// Funções de storage
export const storage = {
  // Barbeiros
  getBarbeiros: (): Barbeiro[] => {
    const data = localStorage.getItem("barbeiros");
    if (!data) {
      localStorage.setItem("barbeiros", JSON.stringify(dadosIniciais.barbeiros));
      return dadosIniciais.barbeiros;
    }
    return JSON.parse(data);
  },
  saveBarbeiros: (barbeiros: Barbeiro[]) => {
    localStorage.setItem("barbeiros", JSON.stringify(barbeiros));
  },

  // Clientes
  getClientes: (): Cliente[] => {
    const data = localStorage.getItem("clientes");
    if (!data) {
      localStorage.setItem("clientes", JSON.stringify(dadosIniciais.clientes));
      return dadosIniciais.clientes;
    }
    return JSON.parse(data);
  },
  saveClientes: (clientes: Cliente[]) => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  },

  // Agendamentos
  getAgendamentos: (): Agendamento[] => {
    const data = localStorage.getItem("agendamentos");
    if (!data) {
      localStorage.setItem("agendamentos", JSON.stringify(dadosIniciais.agendamentos));
      return dadosIniciais.agendamentos;
    }
    return JSON.parse(data);
  },
  saveAgendamentos: (agendamentos: Agendamento[]) => {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  },
};

// Função para simular envio de WhatsApp
export function enviarNotificacaoWhatsApp(cliente: Cliente, agendamento: Agendamento, barbeiro: Barbeiro) {
  const mensagem = `Olá ${cliente.nome}! Seu agendamento está confirmado para ${formatarData(agendamento.data)} às ${agendamento.hora} com ${barbeiro.nome}. Serviço: ${agendamento.servico}`;
  
  // Simula envio - em produção, usar API do WhatsApp Business
  console.log("📱 Enviando WhatsApp para:", cliente.telefone);
  console.log("📄 Mensagem:", mensagem);
  
  // Abre WhatsApp Web (funciona em navegadores)
  const telefone = cliente.telefone.replace(/\D/g, "");
  const url = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
  
  return true;
}

export function formatarData(data: string): string {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}
