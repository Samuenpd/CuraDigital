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
    setErro(null);

    ofertasService
      .listar({ busca: busca || undefined })
      .then(setOfertas)
      .catch(() => setErro('Não foi possível carregar as ofertas.'))
      .finally(() => setCarregando(false));
  }, [busca]);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-hero__badge">
            Cuidado que cabe no seu bolso
          </span>

          <h1>
            Saúde e bem-estar
            <span> mais perto de você.</span>
          </h1>

          <p>
            Encontre medicamentos, produtos de cuidado pessoal e as melhores
            ofertas da CuraDigital.
          </p>

          <div className="home-search">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="search"
              placeholder="O que você está procurando?"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="home-page__busca"
            />

            {busca && (
              <button
                type="button"
                className="home-search__clear"
                onClick={() => setBusca('')}
                aria-label="Limpar busca"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="home-hero__decoration">
          <div className="home-hero__circle home-hero__circle--large" />
          <div className="home-hero__circle home-hero__circle--small" />

          <div className="home-hero__icon">
            +
          </div>
        </div>
      </section>

      <section className="home-offers">
        <div className="home-section-header">
          <div>
            <span className="home-section-header__eyebrow">
              Ofertas especiais
            </span>

            <h2>
              Cuide de você por menos
            </h2>
          </div>

          {!carregando && ofertas.length > 0 && (
            <span className="home-section-header__count">
              {ofertas.length}{' '}
              {ofertas.length === 1 ? 'oferta encontrada' : 'ofertas encontradas'}
            </span>
          )}
        </div>

        {carregando && (
          <div className="home-loading">
            <div className="home-loading__spinner" />
            <p>Carregando ofertas...</p>
          </div>
        )}

        {erro && (
          <div className="home-message home-message--error">
            <strong>Ops!</strong>
            <span>{erro}</span>
          </div>
        )}

        {!carregando && !erro && ofertas.length === 0 && (
          <div className="home-message">
            <div className="home-message__icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21Z"
                  transform="translate(1.5 1.5)"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M8 8L16 16M16 8L8 16"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3>Nenhuma oferta encontrada</h3>
            <p>
              Tente buscar por outro produto ou confira novamente mais tarde.
            </p>
          </div>
        )}

        {!carregando && ofertas.length > 0 && (
          <div className="home-page__grid">
            {ofertas.map((oferta) => (
              <OfertaCard key={oferta.id} oferta={oferta} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;