import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Anexa o token JWT (se existir) em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ofertasService = {
  listar: (params) => api.get('/ofertas', { params }).then((r) => r.data),
  buscarPorId: (id) => api.get(`/ofertas/${id}`).then((r) => r.data),
  criar: (dados) => api.post('/ofertas', dados).then((r) => r.data),
  atualizar: (id, dados) => api.put(`/ofertas/${id}`, dados).then((r) => r.data),
  remover: (id) => api.delete(`/ofertas/${id}`),
};

export const authService = {
  login: (credenciais) => api.post('/auth/login', credenciais).then((r) => r.data),
  registrar: (dados) => api.post('/auth/registrar', dados).then((r) => r.data),
};

export default api;
