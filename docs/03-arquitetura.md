# Arquitetura do Sistema

## Visão de alto nível

```
+------------------+        HTTPS/REST         +------------------+
|                  | -------------------------> |                  |
|     Frontend     |                             |    Backend API   |
| (SASS/SCSS SPA)  | <------------------------- |  (Node.js/Express)|
|                  |            JSON             |                  |
+------------------+                             +---------+--------+
                                                             |
                                           JWT/OAuth,        | publica evento
                                        CORS, Rate-limit     | "novo alerta de preco"
                                                             v
                                                  +----------------------+
                                                  |  Fila de Mensagens   |
                                                  | (RabbitMQ/Redis/     |
                                                  |      Kafka)          |
                                                  +----------+-----------+
                                                             | consome evento
                                                             v
                                                  +----------------------+
                                                  | Notification Service |
                                                  |  (microsservico)     |
                                                  +----------------------+
```

## Fluxo resumido

1. O **Frontend** consome a API REST do **Backend** para listar/gerenciar ofertas.
2. O **Backend** autentica requisições (JWT/OAuth), aplica CORS e rate-limiting.
3. Quando uma oferta relevante muda de preço, o Backend publica um evento
   na fila de mensagens.
4. O **Notification Service** consome esse evento de forma assíncrona e
   dispara o alerta (e-mail, push, etc.), sem acoplar essa responsabilidade
   à API principal.

## Por que um microsserviço separado para alertas?

- Isola uma responsabilidade que pode falhar/escalar de forma independente.
- Evita que picos de notificação impactem a latência da API principal.
- Permite trocar a tecnologia de mensageria sem tocar no backend principal.

## Decisões em aberto (a definir pelo time)

- RabbitMQ vs Redis Pub/Sub vs Kafka
- Node.js/Express vs Spring Boot no backend
- Banco de dados (SQL vs NoSQL) — não especificado no enunciado original
