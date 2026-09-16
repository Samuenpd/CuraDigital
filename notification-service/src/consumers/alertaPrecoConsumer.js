const { Worker } = require('bullmq');
const { connection, NOME_FILA_ALERTAS } = require('../config/queue');
const { notificarAlertaPreco } = require('./notificador');

/**
 * Processa cada job publicado pelo backend em `novo_alerta_preco`
 * (ver backend/src/services/ofertasService.js e eventPublisher.js).
 */
async function processarJob(job) {
  if (job.name !== 'novo_alerta_preco') {
    // Fila preparada pra outros tipos de evento no futuro; por ora
    // só sabemos tratar alerta de preço.
    return;
  }

  const { ofertaId, titulo, precoAnterior, precoNovo } = job.data;
  await notificarAlertaPreco({ ofertaId, titulo, precoAnterior, precoNovo });
}

function iniciarConsumer() {
  const worker = new Worker(NOME_FILA_ALERTAS, processarJob, { connection });

  worker.on('completed', (job) => {
    console.log(`[fila] Job ${job.id} (${job.name}) processado com sucesso.`);
  });

  worker.on('failed', (job, err) => {
    console.error(`[fila] Job ${job?.id} (${job?.name}) falhou:`, err.message);
  });

  return worker;
}

module.exports = { iniciarConsumer, processarJob };
