import { useState, useEffect } from "react";
import { Plus, Search, Users, X, Trash2, Edit, Calendar } from "lucide-react";
import { storage } from "../utils/storage";
import type { Cliente } from "../utils/storage";
import { toast } from "sonner";

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
  });

  useEffect(() => {
    carregarDados();
  }, []);

  function carregarDados() {
    setClientes(storage.getClientes());
  }

  function abrirModal(cliente?: Cliente) {
    if (cliente) {
      setClienteEditando(cliente);
      setForm({
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email || "",
      });
    } else {
      setClienteEditando(null);
      setForm({
        nome: "",
        telefone: "",
        email: "",
      });
    }
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setClienteEditando(null);
  }

  function salvarCliente(e: React.FormEvent) {
    e.preventDefault();

    if (clienteEditando) {
      const atualizados = clientes.map((c) =>
        c.id === clienteEditando.id ? { ...clienteEditando, ...form } : c
      );
      storage.saveClientes(atualizados);
      setClientes(atualizados);
      toast.success("Cliente atualizado com sucesso!");
    } else {
      const novo: Cliente = {
        id: Date.now().toString(),
        ...form,
      };
      const novos = [...clientes, novo];
      storage.saveClientes(novos);
      setClientes(novos);
      toast.success("Cliente adicionado com sucesso!");
    }

    fecharModal();
  }

  function deletarCliente(id: string) {
    if (confirm("Tem certeza que deseja deletar este cliente?")) {
      const filtrados = clientes.filter((c) => c.id !== id);
      storage.saveClientes(filtrados);
      setClientes(filtrados);
      toast.success("Cliente deletado!");
    }
  }

  function contarAgendamentos(clienteId: string) {
    const agendamentos = storage.getAgendamentos();
    return agendamentos.filter(
      (a) => a.clienteId === clienteId && a.status !== "cancelado"
    ).length;
  }

  const clientesFiltrados = clientes.filter((c) => {
    const busca = filtro.toLowerCase();
    return (
      c.nome.toLowerCase().includes(busca) ||
      c.telefone.includes(busca) ||
      (c.email && c.email.toLowerCase().includes(busca))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
          <p className="text-gray-600">Gerencie sua base de clientes</p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="flex items-center justify-center gap-2 bg-amber-600 text-white px-4 py-2.5 rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          <Plus className="h-5 w-5" />
          Adicionar Cliente
        </button>
      </div>

      {/* Filtro */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou email..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Grid de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientesFiltrados.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
            <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">Nenhum cliente encontrado</p>
          </div>
        ) : (
          clientesFiltrados.map((cliente) => (
            <div
              key={cliente.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cliente.nome}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>{contarAgendamentos(cliente.id)} agendamentos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  📞 {cliente.telefone}
                </p>
                {cliente.email && (
                  <p className="text-sm text-gray-600">
                    ✉️ {cliente.email}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => abrirModal(cliente)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </button>
                <button
                  onClick={() => deletarCliente(cliente.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <Trash2 className="h-4 w-4" />
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Criar/Editar */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {clienteEditando ? "Editar Cliente" : "Novo Cliente"}
              </h3>
              <button
                onClick={fecharModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={salvarCliente} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ex: Pedro Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="(11) 99876-5432"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="pedro@email.com (opcional)"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  {clienteEditando ? "Atualizar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
