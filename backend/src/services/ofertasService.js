const OfertaModel = require('../models/Oferta');
const { publicarEvento } = require('./eventPublisher');

const ofertasService = {
  listar(filtros) {
    return OfertaModel.listarTodas(filtros);
  },

  buscarPorId(id) {
    return OfertaModel.buscarPorId(id);
  },

  criar(dados, usuarioId) {
    return OfertaModel.criar({
      titulo: dados.titulo,
      descricao: dados.descricao || null,
      preco_original: dados.preco_original,
      preco_atual: dados.preco_atual,
      imagem_url: dados.imagem_url || null,
      categoria: dados.categoria || null,
      usuario_id: usuarioId || null,
    });
  },

  atualizar(id, dados) {
    const ofertaAntiga = OfertaModel.buscarPorId(id);
    if (!ofertaAntiga) return null;

    const atualizada = OfertaModel.atualizar(id, dados);

    // Regra de negócio: se o preço caiu, publica evento de alerta
    // para o notification-service consumir via fila de mensagens.
    if (atualizada && atualizada.preco_atual < ofertaAntiga.preco_atual) {
      publicarEvento('novo_alerta_preco', {
        ofertaId: atualizada.id,
        titulo: atualizada.titulo,
        precoAnterior: ofertaAntiga.preco_atual,
        precoNovo: atualizada.preco_atual,
      });
    }

    return atualizada;
  },

  remover(id) {
    return OfertaModel.remover(id);
  },
};

module.exports = ofertasService;
