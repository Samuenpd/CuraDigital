# Notification Service — alertas de preço

Worker Node.js isolado que consome jobs BullMQ da fila `alertas-preco` no Redis. Ao receber `novo_alerta_preco`, envia um POST JSON para `NOTIFICATION_WEBHOOK_URL`. Se essa variável não estiver definida, registra uma simulação no console.

## Configuração

- `REDIS_URL`: URL do Redis compartilhado com o backend; padrão local `redis://localhost:6379`.
- `NOTIFICATION_WEBHOOK_URL`: URL HTTPS do endpoint que recebe os alertas.
- `NOTIFICATION_WEBHOOK_TOKEN`: opcional; enviado como `Authorization: Bearer ...`.
- `NOTIFICATION_WEBHOOK_TIMEOUT_MS`: timeout da chamada em milissegundos (padrão 5000).

Falhas HTTP ou timeout são propagados ao BullMQ, que tenta o job novamente conforme a configuração do producer. Sem webhook, o serviço fica em modo de demonstração e não entrega notificações externas.

## Executar

```sh
npm install
npm start
```

Use Node.js 20+ e mantenha o Redis ativo. Não armazene token real no repositório.
