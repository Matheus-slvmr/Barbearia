import { useState, useEffect } from "react";
import { Save, Settings } from "lucide-react";
import { getConfig, saveConfig } from "../../utils/config";
import type { ConfiguracaoBarbearia } from "../../utils/config";
import { toast } from "sonner";

export function AdminConfiguracoes() {
  const [config, setConfig] = useState<ConfiguracaoBarbearia>(getConfig());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveConfig(config);
    toast.success("Configurações salvas com sucesso!");
  }

  function updateConfig(field: string, value: any) {
    setConfig({ ...config, [field]: value });
  }

  function updateEndereco(field: string, value: string) {
    setConfig({
      ...config,
      endereco: { ...config.endereco, [field]: value },
    });
  }

  function updateHorario(field: string, value: string) {
    setConfig({
      ...config,
      horarioFuncionamento: { ...config.horarioFuncionamento, [field]: value },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configurações do Site</h2>
        <p className="text-gray-600">Personalize as informações exibidas no site público</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Informações Básicas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Barbearia *
              </label>
              <input
                type="text"
                required
                value={config.nome}
                onChange={(e) => updateConfig("nome", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slogan
              </label>
              <input
                type="text"
                value={config.slogan}
                onChange={(e) => updateConfig("slogan", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={config.descricao}
                onChange={(e) => updateConfig("descricao", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                value={config.telefone}
                onChange={(e) => updateConfig("telefone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                value={config.whatsapp}
                onChange={(e) => updateConfig("whatsapp", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => updateConfig("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="text"
                value={config.instagram}
                onChange={(e) => updateConfig("instagram", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="@barbeariaals"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="text"
                value={config.facebook}
                onChange={(e) => updateConfig("facebook", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="BarbeariaALS"
              />
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rua
              </label>
              <input
                type="text"
                value={config.endereco.rua}
                onChange={(e) => updateEndereco("rua", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número
              </label>
              <input
                type="text"
                value={config.endereco.numero}
                onChange={(e) => updateEndereco("numero", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bairro
              </label>
              <input
                type="text"
                value={config.endereco.bairro}
                onChange={(e) => updateEndereco("bairro", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                value={config.endereco.cidade}
                onChange={(e) => updateEndereco("cidade", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <input
                type="text"
                value={config.endereco.estado}
                onChange={(e) => updateEndereco("estado", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                maxLength={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                value={config.endereco.cep}
                onChange={(e) => updateEndereco("cep", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Horário de Funcionamento */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Horário de Funcionamento</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(config.horarioFuncionamento).map(([dia, horario]) => (
              <div key={dia}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {dia}
                </label>
                <input
                  type="text"
                  value={horario}
                  onChange={(e) => updateHorario(dia, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="09:00 - 19:00"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all"
          >
            <Save className="h-5 w-5" />
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}
