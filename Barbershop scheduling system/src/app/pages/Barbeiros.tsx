import { useState, useEffect } from "react";
import { Plus, Search, Scissors, X, Trash2, Edit, Calendar } from "lucide-react";
import { storage } from "../utils/storage";
import type { Barbeiro } from "../utils/storage";
import { toast } from "sonner";

export function Barbeiros() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [filtro, setFiltro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [barbeiroEditando, setBarbeiroEditando] = useState<Barbeiro | null>(null);

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    especialidades: [] as string[],
  });

  const especialidadesDisponiveis = [
    "Corte Clássico",
    "Corte Moderno",
    "Barba",
    "Degradê",
    "Design",
    "Pigmentação",
    "Sobrancelha",
    "Platinado",
  ];

  useEffect(() => {
    carregarDados();
  }, []);

  function carregarDados() {
    setBarbeiros(storage.getBarbeiros());
  }

  function abrirModal(barbeiro?: Barbeiro) {
    if (barbeiro) {
      setBarbeiroEditando(barbeiro);
      setForm({
        nome: barbeiro.nome,
        telefone: barbeiro.telefone,
        email: barbeiro.email,
        especialidades: barbeiro.especialidades,
      });
    } else {
      setBarbeiroEditando(null);
      setForm({
        nome: "",
        telefone: "",
        email: "",
        especialidades: [],
      });
    }
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setBarbeiroEditando(null);
  }

  function salvarBarbeiro(e: React.FormEvent) {
    e.preventDefault();

    if (barbeiroEditando) {
      const atualizados = barbeiros.map((b) =>
        b.id === barbeiroEditando.id ? { ...barbeiroEditando, ...form } : b
      );
      storage.saveBarbeiros(atualizados);
      setBarbeiros(atualizados);
      toast.success("Barbeiro atualizado com sucesso!");
    } else {
      const novo: Barbeiro = {
        id: Date.now().toString(),
        ...form,
      };
      const novos = [...barbeiros, novo];
      storage.saveBarbeiros(novos);
      setBarbeiros(novos);
      toast.success("Barbeiro adicionado com sucesso!");
    }

    fecharModal();
  }

  function deletarBarbeiro(id: string) {
    if (confirm("Tem certeza que deseja deletar este barbeiro?")) {
      const filtrados = barbeiros.filter((b) => b.id !== id);
      storage.saveBarbeiros(filtrados);
      setBarbeiros(filtrados);
      toast.success("Barbeiro deletado!");
    }
  }

  function toggleEspecialidade(especialidade: string) {
    if (form.especialidades.includes(especialidade)) {
      setForm({
        ...form,
        especialidades: form.especialidades.filter((e) => e !== especialidade),
      });
    } else {
      setForm({
        ...form,
        especialidades: [...form.especialidades, especialidade],
      });
    }
  }

  function contarAgendamentos(barbeiroId: string) {
    const agendamentos = storage.getAgendamentos();
    return agendamentos.filter(
      (a) => a.barbeiroId === barbeiroId && a.status !== "cancelado"
    ).length;
  }

  const barbeirosFiltrados = barbeiros.filter((b) => {
    const busca = filtro.toLowerCase();
    return (
      b.nome.toLowerCase().includes(busca) ||
      b.email.toLowerCase().includes(busca) ||
      b.telefone.includes(busca)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Barbeiros</h2>
          <p className="text-gray-600">Gerencie sua equipe de profissionais</p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="flex items-center justify-center gap-2 bg-amber-600 text-white px-4 py-2.5 rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          <Plus className="h-5 w-5" />
          Adicionar Barbeiro
        </button>
      </div>

      {/* Filtro */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou telefone..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Grid de Barbeiros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbeirosFiltrados.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
            <Scissors className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">Nenhum barbeiro encontrado</p>
          </div>
        ) : (
          barbeirosFiltrados.map((barbeiro) => (
            <div
              key={barbeiro.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Scissors className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{barbeiro.nome}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>{contarAgendamentos(barbeiro.id)} agendamentos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  📞 {barbeiro.telefone}
                </p>
                <p className="text-sm text-gray-600">
                  ✉️ {barbeiro.email}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Especialidades:</p>
                <div className="flex flex-wrap gap-1">
                  {barbeiro.especialidades.map((esp) => (
                    <span
                      key={esp}
                      className="px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-medium"
                    >
                      {esp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => abrirModal(barbeiro)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </button>
                <button
                  onClick={() => deletarBarbeiro(barbeiro.id)}
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
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {barbeiroEditando ? "Editar Barbeiro" : "Novo Barbeiro"}
              </h3>
              <button
                onClick={fecharModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={salvarBarbeiro} className="p-6 space-y-4">
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
                  placeholder="Ex: João Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  required
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="(11) 98765-4321"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="joao@barberpro.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidades *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {especialidadesDisponiveis.map((esp) => (
                    <label
                      key={esp}
                      className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={form.especialidades.includes(esp)}
                        onChange={() => toggleEspecialidade(esp)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-700">{esp}</span>
                    </label>
                  ))}
                </div>
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
                  {barbeiroEditando ? "Atualizar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
