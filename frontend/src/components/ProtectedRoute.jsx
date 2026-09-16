import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

// Envolve rotas que exigem login (ex.: /checkout, /perfil).
// Quem não está autenticado é redirecionado para /login, guardando
// a página de origem em `state.from` para retornar depois do login.
function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
