import { Outlet, NavLink, Link, useNavigate } from "react-router";
import { Calendar, Scissors, Users, Settings, LayoutDashboard, Home, LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };
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
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-gray-400">Gerenciamento</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <div className="px-4 py-3 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">{user?.nome}</span>
            </div>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <Home className="h-5 w-5" />
            Ver Site
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sair
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
