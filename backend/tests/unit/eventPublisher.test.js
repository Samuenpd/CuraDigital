jest.mock('../../src/config/queue', () => ({
  filaAlertasPreco: { add: jest.fn().mockResolvedValue({ id: 'job-1' }) },
}));

const { filaAlertasPreco } = require('../../src/config/queue');
const { publicarEvento } = require('../../src/services/eventPublisher');

describe('eventPublisher', () => {
  beforeEach(() => jest.clearAllMocks());

  it('publica o evento na fila com o nome e o payload corretos', async () => {
    await publicarEvento('novo_alerta_preco', { ofertaId: 1, precoNovo: 80 });

    expect(filaAlertasPreco.add).toHaveBeenCalledWith(
      'novo_alerta_preco',
      { ofertaId: 1, precoNovo: 80 },
      expect.objectContaining({ attempts: 3 })
    );
  });
});
