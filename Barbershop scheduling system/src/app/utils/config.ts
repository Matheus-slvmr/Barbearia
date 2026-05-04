// Configuração da barbearia (pode ser editada pelo admin)
export interface ConfiguracaoBarbearia {
  nome: string;
  slogan: string;
  descricao: string;
  telefone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  horarioFuncionamento: {
    segunda: string;
    terca: string;
    quarta: string;
    quinta: string;
    sexta: string;
    sabado: string;
    domingo: string;
  };
  corPrimaria: string;
  corSecundaria: string;
}

const configPadrao: ConfiguracaoBarbearia = {
  nome: "BARBEARIA ALS",
  slogan: "Estilo e tradição em cada corte",
  descricao: "Na Barbearia ALS, oferecemos muito mais do que um simples corte de cabelo. Nossa equipe de profissionais altamente qualificados está pronta para proporcionar uma experiência única, combinando técnicas modernas com o charme clássico das barbearias tradicionais. Venha nos visitar e descubra o verdadeiro significado de cuidado pessoal masculino.",
  telefone: "(11) 3456-7890",
  whatsapp: "(11) 99876-5432",
  email: "contato@barbeariaals.com.br",
  instagram: "@barbeariaals",
  facebook: "BarbeariaALS",
  endereco: {
    rua: "Av. Paulista",
    numero: "1000",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100",
  },
  horarioFuncionamento: {
    segunda: "09:00 - 19:00",
    terca: "09:00 - 19:00",
    quarta: "09:00 - 19:00",
    quinta: "09:00 - 19:00",
    sexta: "09:00 - 20:00",
    sabado: "09:00 - 18:00",
    domingo: "Fechado",
  },
  corPrimaria: "#FF6B35",
  corSecundaria: "#1A1A1A",
};

export function getConfig(): ConfiguracaoBarbearia {
  const saved = localStorage.getItem("config");
  if (!saved) {
    localStorage.setItem("config", JSON.stringify(configPadrao));
    return configPadrao;
  }
  return JSON.parse(saved);
}

export function saveConfig(config: ConfiguracaoBarbearia) {
  localStorage.setItem("config", JSON.stringify(config));
}
