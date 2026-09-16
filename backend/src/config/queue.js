const { Queue } = require('bullmq');
const IORedis = require('ioredis');

// BullMQ exige que a conexão do Redis não faça retry automático
// limitado por tentativas (maxRetriesPerRequest: null é o valor
// recomendado pela própria doc do BullMQ para producers/workers).
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

// Nome da fila compartilhado entre backend (producer) e
// notification-service (consumer) — precisa ser idêntico nos dois lados.
const NOME_FILA_ALERTAS = 'alertas-preco';

const filaAlertasPreco = new Queue(NOME_FILA_ALERTAS, { connection });

module.exports = { filaAlertasPreco, NOME_FILA_ALERTAS, connection };
