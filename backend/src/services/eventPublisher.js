const { filaAlertasPreco } = require('../config/queue');

/**
 * Publica um evento na fila de mensagens (BullMQ/Redis).
 *
 * O notification-service consome essa mesma fila
 * (ver notification-service/src/consumers/alertaPrecoConsumer.js)
 * e dispara a notificação de forma assíncrona, sem acoplar essa
 * responsabilidade à API principal (ver docs/03-arquitetura.md).
 *
 * Mantém a mesma assinatura de antes (nomeEvento, payload) para não
 * precisar mexer em quem chama essa função (ofertasService.js).
 */
async function publicarEvento(nomeEvento, payload) {
  await filaAlertasPreco.add(
    nomeEvento,
    payload,
    {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: 100,
      removeOnFail: 500,
    }
  );
}

module.exports = { publicarEvento };
