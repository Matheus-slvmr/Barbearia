import { api } from './api';

export const authService = {
  // Função para fazer o login
  async login(email: string, senha: string) {
    try {
      // Bate na porta /login do nosso back-end
      const resposta = await api.post('/login', { email, senha });

      // O back-end devolveu o usuário e o Token!
      const { usuario, token } = resposta.data;

      // Guardamos o Token no cofre do navegador para usarmos depois
      localStorage.setItem('@Barbearia:token', token);
      
      // Guardamos os dados do usuário para mostrar o nome dele na tela
      localStorage.setItem('@Barbearia:usuario', JSON.stringify(usuario));

      return usuario;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Email ou senha incorretos');
    }
  },

  // Função para deslogar (jogar o crachá fora)
  logout() {
    localStorage.removeItem('@Barbearia:token');
    localStorage.removeItem('@Barbearia:usuario');
    // Aqui você pode redirecionar o usuário para a tela de login
    window.location.href = '/login'; 
  }
};