import { Outlet, NavLink, Link, useNavigate } from "react-router";
import { Calendar, Scissors, Users, Settings, LayoutDashboard, Home, LogOut } from "lucide-react"; // <- Adicione o LogOut
import { useEffect } from "react";
import { authService } from "../../services/authServices";

export function AdminLayout() {
  const navigate = useNavigate();

  // 1. O "Segurança" do Front-end: verifica se tem crachá
  useEffect(() => {
    const token = localStorage.getItem('@Barbearia:token');
    if (!token) {
      navigate("/login"); // Se não tem crachá, manda pro login!
    }
  }, [navigate]);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/agendamentos", label: "Agendamentos", icon: Calendar },
    { path: "/admin/barbeiros", label: "Barbeiros", icon: Scissors },
    { path: "/admin/clientes", label: "Clientes", icon: Users },
    { path: "/admin/configuracoes", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-900 text-white">
        {/* ... (O resto do cabeçalho da sidebar fica igual) ... */}
        
        {/* Adicionei esta div em volta da Home e do Botão de Sair no rodapé da Sidebar */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <Home className="h-5 w-5" />
            Ver Site
          </Link>
          
          <button
            onClick={() => authService.logout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}