# Notification Service — Microsservico de Alertas

Microsservico isolado, responsavel por consumir eventos de "novo alerta
de preco" publicados pelo backend e disparar as notificacoes (e-mail,
push, etc.). Comunicacao via fila de mensagens (RabbitMQ, Redis Pub/Sub
ou Kafka).

Nenhum codigo foi implementado ainda - apenas a estrutura de pastas.
