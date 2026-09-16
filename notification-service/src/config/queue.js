require('dotenv').config();
const IORedis = require('ioredis');

// Mesmo nome de fila usado pelo backend em src/config/queue.js —
// precisa ser idêntico nos dois lados pra o consumer receber os jobs.
const NOME_FILA_ALERTAS = 'alertas-preco';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

module.exports = { connection, NOME_FILA_ALERTAS };
