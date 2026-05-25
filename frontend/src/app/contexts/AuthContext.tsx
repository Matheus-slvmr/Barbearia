import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { storage } from "../utils/storage";

interface User {
  id: string;
  nome: string;
  email: string;
  tipo: "cliente" | "barbeiro";
  telefone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string, tipo: "cliente" | "barbeiro") => boolean;
  cadastrar: (nome: string, email: string, senha: string, telefone: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, senha: string, tipo: "cliente" | "barbeiro"): boolean => {
    if (tipo === "barbeiro") {
      const barbeiros = storage.getBarbeiros();
      const barbeiro = barbeiros.find(b => b.email === email);

      if (barbeiro && barbeiro.senha === senha) {
        const userData: User = {
          id: barbeiro.id,
          nome: barbeiro.nome,
          email: barbeiro.email,
          tipo: "barbeiro",
          telefone: barbeiro.telefone,
        };
        setUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        return true;
      }
    } else {
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const usuario = usuarios.find((u: any) => u.email === email && u.senha === senha);

      if (usuario) {
        const userData: User = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: "cliente",
          telefone: usuario.telefone,
        };
        setUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        return true;
      }
    }

    return false;
  };

  const cadastrar = (nome: string, email: string, senha: string, telefone: string): boolean => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    if (usuarios.some((u: any) => u.email === email)) {
      return false;
    }

    const novoUsuario = {
      id: Date.now().toString(),
      nome,
      email,
      senha,
      telefone,
      tipo: "cliente",
    };

    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    const clientes = storage.getClientes();
    const clienteExiste = clientes.find(c => c.telefone === telefone);

    if (!clienteExiste) {
      storage.saveClientes([...clientes, {
        id: novoUsuario.id,
        nome,
        telefone,
      }]);
    }

    const userData: User = {
      id: novoUsuario.id,
      nome,
      email,
      tipo: "cliente",
      telefone,
    };
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        cadastrar,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.tipo === "barbeiro",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
