/**
 * Abstração do producer de eventos.
 *
 * Por enquanto só loga o evento no console (placeholder), pra não travar
 * o desenvolvimento do backend enquanto o time decide a tecnologia de
 * mensageria (RabbitMQ / Redis Pub/Sub / Kafka — ver docs/03-arquitetura.md).
 *
 * Quando a decisão for tomada, troque o corpo de `publicarEvento` pela
 * chamada real (ex.: channel.publish(...) no RabbitMQ, ou
 * redisClient.publish(...) no Redis Pub/Sub), mantendo a mesma assinatura
 * pra não precisar mexer em quem chama essa função.
 */
function publicarEvento(nomeEvento, payload) {
  console.log(`[evento publicado] ${nomeEvento}`, payload);
  // TODO: substituir pela publicação real na fila de mensagens escolhida.
}

module.exports = { publicarEvento };
