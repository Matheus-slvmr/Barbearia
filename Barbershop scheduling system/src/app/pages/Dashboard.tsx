import { useEffect, useState } from "react";
import { Calendar, Users, Scissors, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { storage } from "../utils/storage";
import { Link } from "react-router";

export function Dashboard() {
  const [stats, setStats] = useState({
    totalAgendamentos: 0,
    agendamentosHoje: 0,
    totalClientes: 0,
    totalBarbeiros: 0,
  });

  const [proximosAgendamentos, setProximosAgendamentos] = useState<any[]>([]);

  useEffect(() => {
    const agendamentos = storage.getAgendamentos();
    const clientes = storage.getClientes();
    const barbeiros = storage.getBarbeiros();
    
    const hoje = new Date().toISOString().split("T")[0];
    const agendamentosHoje = agendamentos.filter(a => a.data === hoje);

    setStats({
      totalAgendamentos: agendamentos.length,
      agendamentosHoje: agendamentosHoje.length,
      totalClientes: clientes.length,
      totalBarbeiros: barbeiros.length,
    });

    // Próximos agendamentos
    const proximos = agendamentos
      .filter(a => a.status !== "cancelado")
      .sort((a, b) => {
        const dataA = new Date(`${a.data}T${a.hora}`);
        const dataB = new Date(`${b.data}T${b.hora}`);
        return dataA.getTime() - dataB.getTime();
      })
      .slice(0, 5)
      .map(ag => ({
        ...ag,
        cliente: clientes.find(c => c.id === ag.clienteId),
        barbeiro: barbeiros.find(b => b.id === ag.barbeiroId),
      }));

    setProximosAgendamentos(proximos);
  }, []);

  const cards = [
    {
      title: "Total de Agendamentos",
      value: stats.totalAgendamentos,
      icon: Calendar,
      color: "bg-blue-500",
      link: "/agendamentos",
    },
    {
      title: "Agendamentos Hoje",
      value: stats.agendamentosHoje,
      icon: Clock,
      color: "bg-amber-500",
      link: "/agendamentos",
    },
    {
      title: "Total de Clientes",
      value: stats.totalClientes,
      icon: Users,
      color: "bg-green-500",
      link: "/clientes",
    },
    {
      title: "Barbeiros Ativos",
      value: stats.totalBarbeiros,
      icon: Scissors,
      color: "bg-purple-500",
      link: "/barbeiros",
    },
  ];

  const statusColors = {
    confirmado: "bg-green-100 text-green-800",
    pendente: "bg-yellow-100 text-yellow-800",
    concluido: "bg-blue-100 text-blue-800",
    cancelado: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Visão geral do seu negócio</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Próximos Agendamentos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Próximos Agendamentos</h3>
              <p className="text-sm text-gray-600">Agendamentos mais recentes</p>
            </div>
            <Link
              to="/agendamentos"
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Ver todos
            </Link>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {proximosAgendamentos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum agendamento encontrado</p>
            </div>
          ) : (
            proximosAgendamentos.map((ag) => (
              <div key={ag.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">{ag.cliente?.nome}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[ag.status as keyof typeof statusColors]
                        }`}
                      >
                        {ag.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{ag.servico}</p>
                    <p className="text-sm text-gray-500">
                      com {ag.barbeiro?.nome}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-right">
                      <p className="text-gray-900 font-medium">{ag.data.split("-").reverse().join("/")}</p>
                      <p className="text-gray-600">{ag.hora}</p>
                    </div>
                    {ag.notificacaoEnviada && (
                      <CheckCircle className="h-5 w-5 text-green-500" title="Notificação enviada" />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
