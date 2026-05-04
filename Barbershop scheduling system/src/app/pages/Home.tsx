import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Scissors, Clock, MapPin, Phone, Mail, Instagram, Facebook, Menu, X, Send } from "lucide-react";
import { getConfig } from "../utils/config";
import { storage, enviarNotificacaoWhatsApp } from "../utils/storage";
import type { ConfiguracaoBarbearia } from "../utils/config";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CalendarioAgendamento } from "../components/CalendarioAgendamento";

export function Home() {
  const [config, setConfig] = useState<ConfiguracaoBarbearia | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formAgendamento, setFormAgendamento] = useState({
    nome: "",
    telefone: "",
    servico: "",
    data: "",
    hora: "",
  });

  const servicosRef = useRef<HTMLElement>(null);
  const sobreRef = useRef<HTMLElement>(null);
  const galeriaRef = useRef<HTMLElement>(null);
  const contatoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) return null;

  const servicos = [
    {
      nome: "Corte Simples",
      descricao: "Corte de cabelo tradicional com acabamento profissional",
      preco: "R$ 40,00",
      icon: "✂️",
    },
    {
      nome: "Corte + Barba",
      descricao: "Corte de cabelo + barba com navalha e toalha quente",
      preco: "R$ 70,00",
      icon: "✂️",
    },
    {
      nome: "Barba Completa",
      descricao: "Aparar, desenhar e finalizar com navalha e toalha quente",
      preco: "R$ 35,00",
      icon: "💈",
    },
    {
      nome: "Progressiva + Corte",
      descricao: "Tratamento progressivo completo com corte personalizado",
      preco: "R$ 120,00",
      icon: "💇",
    },
  ];

  const galeria = [
    "https://images.unsplash.com/photo-1768363446104-b8a0c1716600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBjdXR0aW5nJTIwaGFpciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzYzMzM4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1754294437661-129b86f868ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzc2MzMzODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1593702233354-259d1f794ed1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBmYWRlJTIwaGFpcmN1dHxlbnwxfHx8fDE3NzYzNzg4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1759134198561-e2041049419c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwY2hhaXIlMjBsdXh1cnl8ZW58MXx8fHwxNzc2Mzc4ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1654097803253-d481b6751f29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjB0cmltbWluZyUyMGJlYXJkfGVufDF8fHx8MTc3NjI3MTg3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1754294437661-129b86f868ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXJiZXJzaG9wJTIwZGVzaWdufGVufDF8fHx8MTc3NjM3ODg1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSelectDateTime = (data: string, hora: string) => {
    setFormAgendamento({
      ...formAgendamento,
      data,
      hora,
    });
  };

  const handleAgendamento = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formAgendamento.data || !formAgendamento.hora) {
      toast.error("Por favor, selecione uma data e horário no calendário.");
      return;
    }

    // Adicionar ou buscar cliente
    const clientes = storage.getClientes();
    let cliente = clientes.find(c => c.telefone === formAgendamento.telefone);

    if (!cliente) {
      cliente = {
        id: Date.now().toString(),
        nome: formAgendamento.nome,
        telefone: formAgendamento.telefone,
      };
      storage.saveClientes([...clientes, cliente]);
    }

    // Criar agendamento
    const barbeiros = storage.getBarbeiros();
    const barbeiroAleatorio = barbeiros[Math.floor(Math.random() * barbeiros.length)];

    const agendamento = {
      id: Date.now().toString(),
      clienteId: cliente.id,
      barbeiroId: barbeiroAleatorio?.id || "1",
      data: formAgendamento.data,
      hora: formAgendamento.hora,
      servico: formAgendamento.servico,
      status: "pendente" as const,
      notificacaoEnviada: false,
    };

    const agendamentos = storage.getAgendamentos();
    storage.saveAgendamentos([...agendamentos, agendamento]);

    // Enviar WhatsApp
    if (barbeiroAleatorio) {
      enviarNotificacaoWhatsApp(cliente, agendamento, barbeiroAleatorio);
    }

    toast.success("Agendamento realizado! Você será redirecionado para o WhatsApp.");

    setFormAgendamento({
      nome: "",
      telefone: "",
      servico: "",
      data: "",
      hora: "",
    });
  };

  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">{config.nome}</h1>
                <p className="text-xs text-gray-400">Barber Shop</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-8">
              <button onClick={() => scrollToSection(servicosRef)} className="text-gray-300 hover:text-orange-500 transition-colors">
                Serviços
              </button>
              <button onClick={() => scrollToSection(sobreRef)} className="text-gray-300 hover:text-orange-500 transition-colors">
                Sobre
              </button>
              <button onClick={() => scrollToSection(galeriaRef)} className="text-gray-300 hover:text-orange-500 transition-colors">
                Galeria
              </button>
              <button onClick={() => scrollToSection(contatoRef)} className="text-gray-300 hover:text-orange-500 transition-colors">
                Contato
              </button>
              <Link to="/admin" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Admin
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-3 border-t border-gray-800">
              <button onClick={() => scrollToSection(servicosRef)} className="block w-full text-left py-2 text-gray-300 hover:text-orange-500">
                Serviços
              </button>
              <button onClick={() => scrollToSection(sobreRef)} className="block w-full text-left py-2 text-gray-300 hover:text-orange-500">
                Sobre
              </button>
              <button onClick={() => scrollToSection(galeriaRef)} className="block w-full text-left py-2 text-gray-300 hover:text-orange-500">
                Galeria
              </button>
              <button onClick={() => scrollToSection(contatoRef)} className="block w-full text-left py-2 text-gray-300 hover:text-orange-500">
                Contato
              </button>
              <Link to="/admin" className="block w-full text-left py-2 text-gray-400 hover:text-orange-500">
                Admin
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1768363446104-b8a0c1716600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBjdXR0aW5nJTIwaGFpciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzYzMzM4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Barbearia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {config.nome}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              {config.slogan}
            </p>
            <p className="text-gray-400 mb-8 max-w-xl">
              Experiência única em cortes masculinos, barba e cuidados pessoais. 
              Agende agora e descubra o melhor da tradição barbeira.
            </p>
            <button
              onClick={() => scrollToSection(contatoRef)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-lg hover:shadow-orange-500/50"
            >
              AGENDAR HORÁRIO
            </button>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section ref={servicosRef} className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">SERVIÇOS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicos.map((servico, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-orange-500 transition-all group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {servico.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-orange-500">{servico.nome}</h3>
                <p className="text-gray-400 text-sm mb-4">{servico.descricao}</p>
                <p className="text-2xl font-bold text-white">{servico.preco}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection(contatoRef)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all"
            >
              VER TODOS OS SERVIÇOS
            </button>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section ref={sobreRef} className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">SOBRE NÓS</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mb-6"></div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {config.descricao}
              </p>
              <p className="text-gray-400 leading-relaxed">
                Com anos de experiência no mercado, nos tornamos referência em qualidade 
                e atendimento personalizado. Nossa missão é fazer você sair daqui não apenas 
                com um visual renovado, mas com a autoestima elevada.
              </p>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1754294437661-129b86f868ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzc2MzMzODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Interior da Barbearia"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
              <MapPin className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">UNIDADE 1 - CENTRO</h3>
              <p className="text-gray-400">
                {config.endereco.rua}, {config.endereco.numero}<br />
                {config.endereco.bairro} - {config.endereco.cidade}/{config.endereco.estado}<br />
                CEP: {config.endereco.cep}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
              <Clock className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">HORÁRIO DE FUNCIONAMENTO</h3>
              <div className="text-gray-400 space-y-1">
                <p>Segunda a Sexta: {config.horarioFuncionamento.segunda}</p>
                <p>Sábado: {config.horarioFuncionamento.sabado}</p>
                <p>Domingo: {config.horarioFuncionamento.domingo}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section ref={galeriaRef} className="py-20 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">GALERIA DE FOTOS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galeria.map((img, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl group aspect-square">
                <ImageWithFallback
                  src={img}
                  alt={`Galeria ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato e Agendamento */}
      <section ref={contatoRef} className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">AGENDE SEU HORÁRIO</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna 1: Formulário + Calendário */}
            <div className="lg:col-span-2 space-y-8">
              {/* Formulário */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold mb-6">Preencha seus dados</h3>
                <form onSubmit={handleAgendamento} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formAgendamento.nome}
                        onChange={(e) => setFormAgendamento({ ...formAgendamento, nome: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formAgendamento.telefone}
                        onChange={(e) => setFormAgendamento({ ...formAgendamento, telefone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Serviço *
                    </label>
                    <select
                      required
                      value={formAgendamento.servico}
                      onChange={(e) => setFormAgendamento({ ...formAgendamento, servico: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                    >
                      <option value="">Selecione um serviço</option>
                      {servicos.map((s) => (
                        <option key={s.nome} value={s.nome}>
                          {s.nome} - {s.preco}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formAgendamento.data && formAgendamento.hora && (
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-700 rounded-lg p-4">
                      <p className="text-sm text-gray-300">
                        <strong>Data selecionada:</strong> {new Date(formAgendamento.data + 'T00:00:00').toLocaleDateString('pt-BR')} às {formAgendamento.hora}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    AGENDAR VIA WHATSAPP
                  </button>
                </form>
              </div>

              {/* Calendário */}
              <CalendarioAgendamento
                onSelectDateTime={handleSelectDateTime}
                selectedDate={formAgendamento.data}
                selectedTime={formAgendamento.hora}
              />
            </div>

            {/* Coluna 2: Informações de Contato */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
                <Phone className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Telefone</h3>
                <p className="text-gray-400">{config.telefone}</p>
                <p className="text-gray-400">{config.whatsapp}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
                <Mail className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-400">{config.email}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a
                    href={`https://instagram.com/${config.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-lg hover:scale-110 transition-transform"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href={`https://facebook.com/${config.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 p-3 rounded-lg hover:scale-110 transition-transform"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 {config.nome}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
