import { Outlet, NavLink } from "react-router";
import { Calendar, Scissors, Users, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/agendamentos", label: "Agendamentos", icon: Calendar },
    { path: "/barbeiros", label: "Barbeiros", icon: Scissors },
    { path: "/clientes", label: "Clientes", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">BarberPro</h1>
                <p className="text-xs text-gray-500">Sistema de Gestão</p>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-amber-50 text-amber-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-gray-200 bg-white py-2">
            <div className="max-w-7xl mx-auto px-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-amber-50 text-amber-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
