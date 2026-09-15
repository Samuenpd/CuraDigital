import { Link } from 'react-router-dom';

function OfertaCard({ oferta }) {
  const desconto = Math.round(
    ((oferta.preco_original - oferta.preco_atual) / oferta.preco_original) * 100
  );

  return (
    <Link to={`/ofertas/${oferta.id}`} className="oferta-card">
      <div className="oferta-card__imagem">
        <img
          src={oferta.imagem_url || 'https://placehold.co/300x200?text=Oferta'}
          alt={oferta.titulo}
          loading="lazy"
        />
        {desconto > 0 && <span className="oferta-card__badge">-{desconto}%</span>}
      </div>
      <div className="oferta-card__conteudo">
        <h3>{oferta.titulo}</h3>
        <div className="oferta-card__precos">
          {desconto > 0 && (
            <span className="oferta-card__preco-original">
              R$ {oferta.preco_original.toFixed(2)}
            </span>
          )}
          <span className="oferta-card__preco-atual">R$ {oferta.preco_atual.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}

export default OfertaCard;
