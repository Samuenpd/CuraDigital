async function notificarAlertaPreco(alerta) {
  const { ofertaId, titulo, precoAnterior, precoNovo } = alerta;
  const desconto = Math.round(((precoAnterior - precoNovo) / precoAnterior) * 100);
  const mensagem = {
    tipo: 'alerta_preco',
    ofertaId,
    titulo,
    precoAnterior,
    precoNovo,
    descontoPercentual: desconto,
    mensagem: `A oferta "${titulo}" caiu de R$ ${precoAnterior.toFixed(2)} para R$ ${precoNovo.toFixed(2)} (-${desconto}%).`,
  };

  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log(`[notificacao:simulacao] ${JSON.stringify(mensagem)}`);
    return { enviado: false, modo: 'simulacao' };
  }

  const headers = { 'content-type': 'application/json' };
  if (process.env.NOTIFICATION_WEBHOOK_TOKEN) {
    headers.authorization = `Bearer ${process.env.NOTIFICATION_WEBHOOK_TOKEN}`;
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(mensagem),
    signal: AbortSignal.timeout(Number(process.env.NOTIFICATION_WEBHOOK_TIMEOUT_MS) || 5000),
  });

  if (!response.ok) {
    throw new Error(`Webhook de notificação respondeu HTTP ${response.status}`);
  }

  console.log(`[notificacao] Alerta da oferta #${ofertaId} entregue ao webhook.`);
  return { enviado: true, modo: 'webhook' };
}

module.exports = { notificarAlertaPreco };
