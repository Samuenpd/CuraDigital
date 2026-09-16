jest.mock('../../src/models/Oferta');
jest.mock('../../src/services/eventPublisher');

const OfertaModel = require('../../src/models/Oferta');
const { publicarEvento } = require('../../src/services/eventPublisher');
const ofertasService = require('../../src/services/ofertasService');

describe('ofertasService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('lista ofertas delegando os filtros pro model', () => {
    OfertaModel.listarTodas.mockReturnValue([{ id: 1 }]);

    const resultado = ofertasService.listar({ categoria: 'suplementos' });

    expect(OfertaModel.listarTodas).toHaveBeenCalledWith({ categoria: 'suplementos' });
    expect(resultado).toEqual([{ id: 1 }]);
  });

  it('publica evento de alerta quando o preço cai', () => {
    OfertaModel.buscarPorId.mockReturnValue({ id: 1, preco_atual: 100 });
    OfertaModel.atualizar.mockReturnValue({
      id: 1,
      titulo: 'Vitamina C',
      preco_atual: 80,
    });

    ofertasService.atualizar(1, { preco_atual: 80 });

    expect(publicarEvento).toHaveBeenCalledWith(
      'novo_alerta_preco',
      expect.objectContaining({ ofertaId: 1, precoAnterior: 100, precoNovo: 80 })
    );
  });

  it('não publica evento quando o preço não cai', () => {
    OfertaModel.buscarPorId.mockReturnValue({ id: 1, preco_atual: 100 });
    OfertaModel.atualizar.mockReturnValue({ id: 1, titulo: 'Vitamina C', preco_atual: 100 });

    ofertasService.atualizar(1, { preco_atual: 100 });

    expect(publicarEvento).not.toHaveBeenCalled();
  });

  it('retorna null ao tentar atualizar uma oferta inexistente', () => {
    OfertaModel.buscarPorId.mockReturnValue(undefined);

    const resultado = ofertasService.atualizar(999, { preco_atual: 10 });

    expect(resultado).toBeNull();
    expect(OfertaModel.atualizar).not.toHaveBeenCalled();
  });
});
