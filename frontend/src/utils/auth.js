// Funções utilitárias de autenticação. O token é salvo pelo Login
// (ver src/pages/Login.jsx) em localStorage, e lido pelo interceptor
// do axios em src/services/api.js.

export function isAuthenticated() {
  return Boolean(localStorage.getItem('token'));
}

export function logout() {
  localStorage.removeItem('token');
}
