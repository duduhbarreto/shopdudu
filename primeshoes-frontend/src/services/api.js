import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      toast.error('Sessão expirada. Por favor, faça login novamente.');
      window.location.href = '/login';
    } else if (response && response.status === 403) {
      toast.error('Você não tem permissão para acessar este recurso.');
    } else if (response && response.data) {
      toast.error(response.data.message || 'Ocorreu um erro na requisição.');
    } else {
      toast.error('Erro de conexão com o servidor. Tente novamente mais tarde.');
    }
    
    return Promise.reject(error);
  }
);

export default api;import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      toast.error('Sessão expirada. Por favor, faça login novamente.');
      window.location.href = '/login';
    } else if (response && response.status === 403) {
      toast.error('Você não tem permissão para acessar este recurso.');
    } else if (response && response.data) {
      toast.error(response.data.message || 'Ocorreu um erro na requisição.');
    } else {
      toast.error('Erro de conexão com o servidor. Tente novamente mais tarde.');
    }
    
    return Promise.reject(error);
  }
);

export default api;