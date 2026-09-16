import { useEffect, useState } from 'react';
import Button from './Button';

const CAMPOS_INICIAIS = {
  titulo: '',
  descricao: '',
  preco_original: '',
  preco_atual: '',
  imagem_url: '',
  categoria: '',
};

// `ofertaInicial`: null -> formulário de criação; objeto -> formulário de edição pré-preenchido.
function OfertaForm({ ofertaInicial, aoSalvar, aoCancelar, salvando }) {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS);

  useEffect(() => {
    if (ofertaInicial) {
      setCampos({
        titulo: ofertaInicial.titulo || '',
        descricao: ofertaInicial.descricao || '',
        preco_original: ofertaInicial.preco_original ?? '',
        preco_atual: ofertaInicial.preco_atual ?? '',
        imagem_url: ofertaInicial.imagem_url || '',
        categoria: ofertaInicial.categoria || '',
      });
    } else {
      setCampos(CAMPOS_INICIAIS);
    }
  }, [ofertaInicial]);

  function handleChange(campo, valor) {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    aoSalvar({
      titulo: campos.titulo,
      descricao: campos.descricao || null,
      preco_original: Number(campos.preco_original),
      preco_atual: Number(campos.preco_atual),
      imagem_url: campos.imagem_url || null,
      categoria: campos.categoria || null,
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label>
        Título
        <input
          value={campos.titulo}
          onChange={(e) => handleChange('titulo', e.target.value)}
          placeholder="Ex: Vitamina C 1g Efervescente"
          required
        />
      </label>

      <label>
        Descrição
        <textarea
          value={campos.descricao}
          onChange={(e) => handleChange('descricao', e.target.value)}
          rows={3}
          placeholder="Detalhes do produto, indicação, quantidade..."
        />
      </label>

      <div className="admin-form__linha">
        <label>
          Preço original (R$)
          <input
            type="number"
            step="0.01"
            min="0"
            value={campos.preco_original}
            onChange={(e) => handleChange('preco_original', e.target.value)}
            required
          />
        </label>

        <label>
          Preço atual (R$)
          <input
            type="number"
            step="0.01"
            min="0"
            value={campos.preco_atual}
            onChange={(e) => handleChange('preco_atual', e.target.value)}
            required
          />
        </label>
      </div>

      <label>
        Categoria
        <input
          value={campos.categoria}
          onChange={(e) => handleChange('categoria', e.target.value)}
          placeholder="Ex: Suplementos"
        />
      </label>

      <label>
        URL da imagem
        <input
          value={campos.imagem_url}
          onChange={(e) => handleChange('imagem_url', e.target.value)}
          placeholder="https://... ou http://localhost:3000/imagens/produto.jpg"
        />
      </label>

      <div className="admin-form__acoes">
        <Button type="submit" variant="primary" disabled={salvando}>
          {salvando ? 'Salvando...' : ofertaInicial ? 'Salvar alterações' : 'Criar oferta'}
        </Button>

        {aoCancelar && (
          <Button type="button" variant="texto" onClick={aoCancelar}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}

export default OfertaForm;
