import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../components/Button';
import { authService } from '../services/api';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const destino = location.state?.from?.pathname || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      await authService.registrar({ nome, email, senha });
      const { token } = await authService.login({ email, senha });
      localStorage.setItem('token', token);
      navigate(destino, { replace: true });
    } catch {
      setErro('Não foi possível criar sua conta. Verifique os dados e tente de novo.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="auth-card__eyebrow">Cuidado que cabe no seu bolso</span>
        <h1>Criar conta</h1>
        <p className="auth-card__subtitulo">
          Leva menos de um minuto — e só é necessário na hora de comprar.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
            />
          </label>

          {erro && <p className="auth-card__erro">{erro}</p>}

          <Button type="submit" variant="primary" disabled={carregando}>
            {carregando ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <p className="auth-card__rodape">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
