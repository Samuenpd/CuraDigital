require('dotenv').config();
const { iniciarConsumer } = require('./consumers/alertaPrecoConsumer');

const worker = iniciarConsumer();

console.log('[notification-service] Aguardando eventos na fila "alertas-preco"...');

process.on('SIGTERM', async () => {
  await worker.close();
  process.exit(0);
});
