import { useEffect, useState } from 'react';
import Button from '../components/Button';
import OfertaForm from '../components/OfertaForm';
import { ofertasService } from '../services/api';

function AdminOfertas() {
  const [ofertas, setOfertas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  // null = formulário fechado; {} = criando; {...oferta} = editando
  const [ofertaEmEdicao, setOfertaEmEdicao] = useState(null);
  const [salvando, setSalvando] = useState(false);

  function carregarOfertas() {
    setCarregando(true);
    setErro(null);
    ofertasService
      .listar()
      .then(setOfertas)
      .catch(() => setErro('Não foi possível carregar as ofertas.'))
      .finally(() => setCarregando(false));
  }

  useEffect(carregarOfertas, []);

  async function handleSalvar(dados) {
    setSalvando(true);
    setErro(null);
    try {
      if (ofertaEmEdicao?.id) {
        await ofertasService.atualizar(ofertaEmEdicao.id, dados);
      } else {
        await ofertasService.criar(dados);
      }
      setOfertaEmEdicao(null);
      carregarOfertas();
    } catch {
      setErro('Não foi possível salvar a oferta. Confira os campos e tente de novo.');
    } finally {
      setSalvando(false);
    }
  }

  async function handleRemover(oferta) {
    const confirmar = window.confirm(
      `Remover "${oferta.titulo}"? Essa ação não pode ser desfeita.`
    );
    if (!confirmar) return;

    try {
      await ofertasService.remover(oferta.id);
      carregarOfertas();
    } catch {
      setErro('Não foi possível remover essa oferta.');
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page__topo">
        <div>
          <span className="admin-page__eyebrow">Painel administrativo</span>
          <h1>Gerenciar ofertas</h1>
        </div>

        {!ofertaEmEdicao && (
          <Button variant="primary" onClick={() => setOfertaEmEdicao({})}>
            + Nova oferta
          </Button>
        )}
      </div>

      {erro && <p className="admin-page__erro">{erro}</p>}

      {ofertaEmEdicao && (
        <div className="admin-form-card">
          <h2>{ofertaEmEdicao.id ? 'Editar oferta' : 'Nova oferta'}</h2>
          <OfertaForm
            ofertaInicial={ofertaEmEdicao.id ? ofertaEmEdicao : null}
            aoSalvar={handleSalvar}
            aoCancelar={() => setOfertaEmEdicao(null)}
            salvando={salvando}
          />
        </div>
      )}

      {carregando ? (
        <p>Carregando ofertas...</p>
      ) : (
        <div className="admin-tabela">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço original</th>
                <th>Preço atual</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ofertas.map((oferta) => (
                <tr key={oferta.id}>
                  <td>{oferta.titulo}</td>
                  <td>{oferta.categoria || '—'}</td>
                  <td>R$ {oferta.preco_original.toFixed(2)}</td>
                  <td>R$ {oferta.preco_atual.toFixed(2)}</td>
                  <td className="admin-tabela__acoes">
                    <button
                      type="button"
                      className="btn btn--texto"
                      onClick={() => setOfertaEmEdicao(oferta)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn--texto admin-tabela__remover"
                      onClick={() => handleRemover(oferta)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}

              {ofertas.length === 0 && (
                <tr>
                  <td colSpan={5}>Nenhuma oferta cadastrada ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOfertas;
