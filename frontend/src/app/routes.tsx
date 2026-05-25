import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { AdminLayout } from "./components/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminAgendamentos } from "./pages/admin/AdminAgendamentos";
import { AdminBarbeiros } from "./pages/admin/AdminBarbeiros";
import { AdminClientes } from "./pages/admin/AdminClientes";
import { AdminConfiguracoes } from "./pages/admin/AdminConfiguracoes";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/cadastro",
    Component: Cadastro,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      { path: "agendamentos", Component: AdminAgendamentos },
      { path: "barbeiros", Component: AdminBarbeiros },
      { path: "clientes", Component: AdminClientes },
      { path: "configuracoes", Component: AdminConfiguracoes },
    ],
  },
]);
