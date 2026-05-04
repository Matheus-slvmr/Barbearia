import { useState, useEffect } from "react";
import { Plus, Search, Calendar, Send, X, Trash2, Edit } from "lucide-react";
import { storage, enviarNotificacaoWhatsApp, formatarData } from "../utils/storage";
import type { Agendamento, Cliente, Barbeiro } from "../utils/storage";
import { toast } from "sonner";

export function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [filtro, setFiltro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoEditando, setAgendamentoEditando] = useState<Agendamento | null>(null);

  const [form, setForm] = useState({
    clienteId: "",
    barbeiroId: "",
    data: "",
    hora: "",
    servico: "",
    status: "pendente" as const,
  });

  useEffect(() => {
    carregarDados();
  }, []);

  function carregarDados() {
    setAgendamentos(storage.getAgendamentos());
    setClientes(storage.getClientes());
    setBarbeiros(storage.getBarbeiros());
  }

  function abrirModal(agendamento?: Agendamento) {
    if (agendamento) {
      setAgendamentoEditando(agendamento);
      setForm({
        clienteId: agendamento.clienteId,
        barbeiroId: agendamento.barbeiroId,
        data: agendamento.data,
        hora: agendamento.hora,
        servico: agendamento.servico,
        status: agendamento.status,
      });
    } else {
      setAgendamentoEditando(null);
      setForm({
        clienteId: "",
        barbeiroId: "",
        data: "",
        hora: "",
        servico: "",
        status: "pendente",
      });
    }
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setAgendamentoEditando(null);
  }

  function salvarAgendamento(e: React.FormEvent) {
    e.preventDefault();

    if (agendamentoEditando) {
      const atualizados = agendamentos.map((ag) =>
        ag.id === agendamentoEditando.id ? { ...agendamentoEditando, ...form } : ag
      );
      storage.saveAgendamentos(atualizados);
      setAgendamentos(atualizados);
      toast.success("Agendamento atualizado com sucesso!");
    } else {
      const novo: Agendamento = {
        id: Date.now().toString(),
        ...form,
        notificacaoEnviada: false,
      };
      const novos = [...agendamentos, novo];
      storage.saveAgendamentos(novos);
      setAgendamentos(novos);
      toast.success("Agendamento criado com sucesso!");
    }

    fecharModal();
  }

  function deletarAgendamento(id: string) {
    if (confirm("Tem certeza que deseja deletar este agendamento?")) {
      const filtrados = agendamentos.filter((ag) => ag.id !== id);
      storage.saveAgendamentos(filtrados);
      setAgendamentos(filtrados);
      toast.success("Agendamento deletado!");
    }
  }

  function enviarWhatsApp(agendamento: Agendamento) {
    const cliente = clientes.find((c) => c.id === agendamento.clienteId);
    const barbeiro = barbeiros.find((b) => b.id === agendamento.barbeiroId);

    if (cliente && barbeiro) {
      enviarNotificacaoWhatsApp(cliente, agendamento, barbeiro);
      
      // Marcar como notificação enviada
      const atualizados = agendamentos.map((ag) =>
        ag.id === agendamento.id ? { ...ag, notificacaoEnviada: true } : ag
      );
      storage.saveAgendamentos(atualizados);
      setAgendamentos(atualizados);
      
      toast.success("Notificação enviada via WhatsApp!");
    }
  }

  const agendamentosFiltrados = agendamentos.filter((ag) => {
    const cliente = clientes.find((c) => c.id === ag.clienteId);
    const barbeiro = barbeiros.find((b) => b.id === ag.barbeiroId);
    const busca = filtro.toLowerCase();
    
    return (
      cliente?.nome.toLowerCase().includes(busca) ||
      barbeiro?.nome.toLowerCase().includes(busca) ||
      ag.servico.toLowerCase().includes(busca) ||
      ag.data.includes(busca)
    );
  });

  const statusColors = {
    confirmado: "bg-green-100 text-green-800",
    pendente: "bg-yellow-100 text-yellow-800",
    concluido: "bg-blue-100 text-blue-800",
    cancelado: "bg-red-100 text-red-800",
  };

  const servicosComuns = [
    "Corte Simples",
    "Corte + Barba",
    "Barba",
    "Degradê",
    "Design",
    "Pigmentação",
    "Corte + Barba + Sobrancelha",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agendamentos</h2>
          <p className="text-gray-600">Gerencie todos os agendamentos</p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="flex items-center justify-center gap-2 bg-amber-600 text-white px-4 py-2.5 rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          <Plus className="h-5 w-5" />
          Novo Agendamento
        </button>
      </div>

      {/* Filtro */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por cliente, barbeiro, serviço ou data..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barbeiro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agendamentosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Nenhum agendamento encontrado</p>
                  </td>
                </tr>
              ) : (
                agendamentosFiltrados.map((ag) => {
                  const cliente = clientes.find((c) => c.id === ag.clienteId);
                  const barbeiro = barbeiros.find((b) => b.id === ag.barbeiroId);

                  return (
                    <tr key={ag.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{cliente?.nome}</div>
                          <div className="text-sm text-gray-500">{cliente?.telefone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {barbeiro?.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {ag.servico}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{formatarData(ag.data)}</div>
                        <div className="text-sm text-gray-500">{ag.hora}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[ag.status]
                          }`}
                        >
                          {ag.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => enviarWhatsApp(ag)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Enviar WhatsApp"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => abrirModal(ag)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deletarAgendamento(ag.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Deletar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Criar/Editar */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {agendamentoEditando ? "Editar Agendamento" : "Novo Agendamento"}
              </h3>
              <button
                onClick={fecharModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={salvarAgendamento} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente *
                </label>
                <select
                  required
                  value={form.clienteId}
                  onChange={(e) => setForm({ ...form, clienteId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Barbeiro *
                </label>
                <select
                  required
                  value={form.barbeiroId}
                  onChange={(e) => setForm({ ...form, barbeiroId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Selecione um barbeiro</option>
                  {barbeiros.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serviço *
                </label>
                <select
                  required
                  value={form.servico}
                  onChange={(e) => setForm({ ...form, servico: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Selecione um serviço</option>
                  {servicosComuns.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.data}
                    onChange={(e) => setForm({ ...form, data: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora *
                  </label>
                  <input
                    type="time"
                    required
                    value={form.hora}
                    onChange={(e) => setForm({ ...form, hora: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  required
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as any })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="pendente">Pendente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
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
                  {agendamentoEditando ? "Atualizar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
