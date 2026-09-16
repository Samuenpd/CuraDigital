/**
 * Disparo da notificação em si.
 *
 * Hoje só loga formatado no console (mock), pra não travar o time numa
 * decisão de provedor de e-mail/push antes da entrega. Quando o time
 * escolher um provedor real (ex.: Resend, SendGrid, Firebase Cloud
 * Messaging), troque só o corpo desta função — quem chama
 * (alertaPrecoConsumer.js) não precisa mudar.
 */
async function notificarAlertaPreco({ ofertaId, titulo, precoAnterior, precoNovo }) {
  const desconto = Math.round(((precoAnterior - precoNovo) / precoAnterior) * 100);

  console.log(
    `[notificacao] Oferta #${ofertaId} "${titulo}" caiu de ` +
    `R$ ${precoAnterior.toFixed(2)} para R$ ${precoNovo.toFixed(2)} (-${desconto}%). ` +
    'Alerta enviado aos usuários inscritos.'
  );

  return { enviado: true };
}

module.exports = { notificarAlertaPreco };
