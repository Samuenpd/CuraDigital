import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const logado = isAuthenticated();

  function handleSair() {
    logout();
    navigate('/');
  }

  return (
    <header className="site-header">
      <Link to="/" className="site-header__logo">
        <span className="site-header__logo-icon">+</span>
        CuraDigital
      </Link>

      <nav className="site-header__nav">
        <Link
          to="/"
          className="site-header__link"
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          Ofertas
        </Link>

        {logado ? (
          <>
            <Link to="/admin/ofertas" className="site-header__link">
              Gerenciar ofertas
            </Link>
            <button type="button" className="btn btn--outline" onClick={handleSair}>
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="site-header__link">
              Entrar
            </Link>
            <Link to="/cadastro" className="btn btn--primary">
              Criar conta
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
