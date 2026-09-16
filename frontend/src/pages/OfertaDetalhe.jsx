import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { ofertasService } from '../services/api';
import { isAuthenticated } from '../utils/auth';

function OfertaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [oferta, setOferta] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    ofertasService
      .buscarPorId(id)
      .then(setOferta)
      .catch(() => setErro('Oferta não encontrada.'));
  }, [id]);

  function handleComprar() {
    if (!isAuthenticated()) {
      // Navega livremente até aqui, mas comprar exige conta —
      // guardamos a rota atual para voltar direto após o login.
      navigate('/login', { state: { from: { pathname: `/checkout/${id}` } } });
      return;
    }
    navigate(`/checkout/${id}`);
  }

  if (erro) {
    return (
      <div className="oferta-detalhe-page">
        <div className="oferta-detalhe">
          <p>{erro}</p>
        </div>
      </div>
    );
  }

  if (!oferta) {
    return (
      <div className="oferta-detalhe-page">
        <div className="oferta-detalhe">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  const desconto = Math.round(
    ((oferta.preco_original - oferta.preco_atual) / oferta.preco_original) * 100
  );

  return (
    <div className="oferta-detalhe-page">
      <div className="oferta-detalhe">
        <Link to="/" className="oferta-detalhe__voltar">
          &larr; Voltar para as ofertas
        </Link>

        <div className="oferta-detalhe__card">
          <div className="oferta-detalhe__imagem">
            <img
              src={oferta.imagem_url || 'https://placehold.co/600x450?text=Oferta'}
              alt={oferta.titulo}
            />
          </div>

          <div className="oferta-detalhe__info">
            {oferta.categoria && (
              <span className="oferta-detalhe__categoria">{oferta.categoria}</span>
            )}

            <h1>{oferta.titulo}</h1>

            {oferta.descricao && (
              <p className="oferta-detalhe__descricao">{oferta.descricao}</p>
            )}

            <div className="oferta-detalhe__precos">
              {desconto > 0 && (
                <span className="oferta-detalhe__preco-original">
                  R$ {oferta.preco_original.toFixed(2)}
                </span>
              )}
              <span className="oferta-detalhe__preco-atual">
                R$ {oferta.preco_atual.toFixed(2)}
              </span>
            </div>

            <div className="oferta-detalhe__acoes">
              <Button variant="primary" onClick={handleComprar}>
                Comprar
              </Button>

              {!isAuthenticated() && (
                <span className="oferta-detalhe__aviso-login">
                  Você pode navegar livremente pelo site — só pedimos login na hora de
                  finalizar a compra.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfertaDetalhe;
