const ofertasService = require('../services/ofertasService');

const ofertasController = {
  listar(req, res) {
    const { categoria, busca } = req.query;
    const ofertas = ofertasService.listar({ categoria, busca });
    res.json(ofertas);
  },

  buscarPorId(req, res) {
    const oferta = ofertasService.buscarPorId(req.params.id);
    if (!oferta) return res.status(404).json({ erro: 'Oferta não encontrada' });
    res.json(oferta);
  },

  criar(req, res) {
    const { titulo, preco_original, preco_atual } = req.body;
    if (!titulo || preco_original == null || preco_atual == null) {
      return res.status(400).json({ erro: 'titulo, preco_original e preco_atual são obrigatórios' });
    }
    const oferta = ofertasService.criar(req.body, req.usuario?.id);
    res.status(201).json(oferta);
  },

  atualizar(req, res) {
    const oferta = ofertasService.atualizar(req.params.id, req.body);
    if (!oferta) return res.status(404).json({ erro: 'Oferta não encontrada' });
    res.json(oferta);
  },

  remover(req, res) {
    const removida = ofertasService.remover(req.params.id);
    if (!removida) return res.status(404).json({ erro: 'Oferta não encontrada' });
    res.status(204).send();
  },
};

module.exports = ofertasController;
