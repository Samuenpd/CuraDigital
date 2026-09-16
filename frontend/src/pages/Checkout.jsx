import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { ofertasService } from '../services/api';

function Checkout() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);
  const [erro, setErro] = useState(null);
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    ofertasService
      .buscarPorId(id)
      .then(setOferta)
      .catch(() => setErro('Oferta não encontrada.'));
  }, [id]);

  if (erro) {
    return (
      <div className="checkout-page">
        <div className="checkout">
          <p>{erro}</p>
        </div>
      </div>
    );
  }

  if (!oferta) {
    return (
      <div className="checkout-page">
        <div className="checkout">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout">
        <Link to={`/ofertas/${id}`} className="checkout__voltar">
          &larr; Voltar para a oferta
        </Link>

        <div className="checkout__card">
          {concluido ? (
            <div className="checkout__sucesso">
              <div className="checkout__sucesso-icone">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2>Compra confirmada</h2>
              <p>Você vai receber os detalhes do pedido por e-mail em instantes.</p>
              <Link to="/" className="btn btn--outline">
                Voltar para as ofertas
              </Link>
            </div>
          ) : (
            <>
              <h1>Finalizar compra</h1>

              <div className="checkout__item">
                <img
                  src={oferta.imagem_url || 'https://placehold.co/200x200?text=Oferta'}
                  alt={oferta.titulo}
                />
                <div className="checkout__item-info">
                  <h2>{oferta.titulo}</h2>
                  <span>R$ {oferta.preco_atual.toFixed(2)}</span>
                </div>
              </div>

              <Button variant="primary" onClick={() => setConcluido(true)}>
                Confirmar compra
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
