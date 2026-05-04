import { useEffect, useState } from "react";
import { Calendar, Users, Scissors, TrendingUp } from "lucide-react";
import { storage } from "../../utils/storage";
import { Link } from "react-router";

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAgendamentos: 0,
    agendamentosHoje: 0,
    totalClientes: 0,
    totalBarbeiros: 0,
  });

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
  }, []);

  const cards = [
    {
      title: "Total de Agendamentos",
      value: stats.totalAgendamentos,
      icon: Calendar,
      color: "bg-blue-500",
      link: "/admin/agendamentos",
    },
    {
      title: "Agendamentos Hoje",
      value: stats.agendamentosHoje,
      icon: TrendingUp,
      color: "bg-orange-500",
      link: "/admin/agendamentos",
    },
    {
      title: "Total de Clientes",
      value: stats.totalClientes,
      icon: Users,
      color: "bg-green-500",
      link: "/admin/clientes",
    },
    {
      title: "Barbeiros Ativos",
      value: stats.totalBarbeiros,
      icon: Scissors,
      color: "bg-purple-500",
      link: "/admin/barbeiros",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h2>
        <p className="text-gray-600">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Bem-vindo ao Painel Administrativo!</h3>
        <p className="text-orange-100 mb-6">
          Gerencie sua barbearia de forma profissional. Controle agendamentos, barbeiros, 
          clientes e personalize as configurações do site.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/agendamentos"
            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
          >
            Ver Agendamentos
          </Link>
          <Link
            to="/admin/configuracoes"
            className="bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors"
          >
            Configurar Site
          </Link>
        </div>
      </div>
    </div>
  );
}
