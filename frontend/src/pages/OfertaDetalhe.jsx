import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ofertasService } from '../services/api';

function OfertaDetalhe() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    ofertasService
      .buscarPorId(id)
      .then(setOferta)
      .catch(() => setErro('Oferta não encontrada.'));
  }, [id]);

  if (erro) return <p className="erro">{erro}</p>;
  if (!oferta) return <p>Carregando...</p>;

  return (
    <div className="oferta-detalhe">
      <Link to="/">&larr; Voltar</Link>
      <img
        src={oferta.imagem_url || 'https://placehold.co/600x400?text=Oferta'}
        alt={oferta.titulo}
      />
      <h1>{oferta.titulo}</h1>
      <p>{oferta.descricao}</p>
      <div className="oferta-detalhe__precos">
        <span className="oferta-detalhe__preco-original">
          R$ {oferta.preco_original.toFixed(2)}
        </span>
        <span className="oferta-detalhe__preco-atual">
          R$ {oferta.preco_atual.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default OfertaDetalhe;
