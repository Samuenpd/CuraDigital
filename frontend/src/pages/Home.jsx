import { useEffect, useState } from 'react';
import OfertaCard from '../components/OfertaCard';
import { ofertasService } from '../services/api';

function Home() {
  const [ofertas, setOfertas] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    ofertasService
      .listar({ busca: busca || undefined })
      .then(setOfertas)
      .catch(() => setErro('Não foi possível carregar as ofertas.'))
      .finally(() => setCarregando(false));
  }, [busca]);

  return (
    <div className="home-page">
      <h1>Plataforma de Ofertas</h1>

      <input
        type="search"
        placeholder="Buscar ofertas..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="home-page__busca"
      />

      {carregando && <p>Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}

      <div className="home-page__grid">
        {!carregando && ofertas.length === 0 && <p>Nenhuma oferta encontrada.</p>}
        {ofertas.map((oferta) => (
          <OfertaCard key={oferta.id} oferta={oferta} />
        ))}
      </div>
    </div>
  );
}

export default Home;
