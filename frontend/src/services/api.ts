import axios from 'axios';

// 1. Criamos a instância do Axios com o endereço do nosso Back-end
export const api = axios.create({
  baseURL: 'http://localhost:3000', // A porta onde o seu Node.js está rodando
});

// 2. A Mágica do Interceptador (O cara que mostra o crachá automaticamente)
api.interceptors.request.use(
  (config) => {
    // Toda vez que o React for pedir algo para o Back-end, ele passa por aqui primeiro.
    // Nós olhamos se existe um Token guardado no navegador do usuário
    const token = localStorage.getItem('@Barbearia:token');

    // Se existir, nós grampeamos esse token no cabeçalho da requisição
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);