import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Scissors, User, Lock, Mail } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { getConfig } from "../utils/config";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const config = getConfig();

  const [tipoLogin, setTipoLogin] = useState<"cliente" | "barbeiro">("cliente");
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sucesso = login(formData.email, formData.senha, tipoLogin);

    if (sucesso) {
      toast.success(`Bem-vindo(a)!`);
      if (tipoLogin === "barbeiro") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      toast.error("Email ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-lg">
              <Scissors className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">{config.nome}</h1>
              <p className="text-sm text-gray-400">Barber Shop</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta</h2>
          <p className="text-gray-400">Faça login para continuar</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 mb-6">
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setTipoLogin("cliente")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                tipoLogin === "cliente"
                  ? "bg-gradient-to-r from-orange-500 to-red-600"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <User className="h-5 w-5 inline mr-2" />
              Cliente
            </button>
            <button
              type="button"
              onClick={() => setTipoLogin("barbeiro")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                tipoLogin === "barbeiro"
                  ? "bg-gradient-to-r from-orange-500 to-red-600"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <Scissors className="h-5 w-5 inline mr-2" />
              Barbeiro
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all"
            >
              ENTRAR
            </button>
          </form>
        </div>

        {tipoLogin === "cliente" && (
          <div className="text-center">
            <p className="text-gray-400">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="text-orange-500 hover:text-orange-400 font-semibold">
                Cadastre-se
              </Link>
            </p>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
}
