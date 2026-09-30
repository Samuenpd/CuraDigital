# Guia de execução local

## Pré-requisitos

Node.js 20+, npm e Docker com Docker Compose. Abra quatro terminais a partir da raiz do repositório.

## Redis

```sh
docker compose up -d redis
```

## API

```sh
cd backend
npm ci
npm run seed
npm start
```

API padrão: `http://localhost:3000`; verificação: `GET /health`. Defina no ambiente `PORT=3000`, `CORS_ORIGIN=http://localhost:5173`, `JWT_SECRET=<segredo-local-forte>` e `REDIS_URL=redis://localhost:6379`.

## Serviço de notificações

```sh
cd notification-service
npm install
npm start
```

Defina `REDIS_URL=redis://localhost:6379`, igual à API. O worker escuta a fila `alertas-preco`.

Para encaminhar eventos a um sistema externo, configure `NOTIFICATION_WEBHOOK_URL` (endpoint HTTPS que aceite POST JSON). Opcionalmente configure `NOTIFICATION_WEBHOOK_TOKEN` para autenticação Bearer e `NOTIFICATION_WEBHOOK_TIMEOUT_MS` para ajustar o timeout. Sem webhook definido, o serviço imprime uma simulação no console.

## Frontend

```sh
cd frontend
npm ci
npm run dev
```

Defina `VITE_API_URL=http://localhost:3000` antes de iniciar o Vite. A aplicação estará em `http://localhost:5173`.

## Checagens

- Backend: `cd backend && npm test`.
- Frontend: `cd frontend && npm test`, `npm run build` e `npm run test:e2e` (com o servidor dev ativo).
- Lighthouse: `cd frontend && npm run build && npx --yes @lhci/cli@0.14.0 autorun` (performance mínima 81/100).
- CI: push ou abra pull request para executar `.github/workflows/ci.yml`.

Encerre serviços locais com `docker compose down`. Não use segredos reais em variáveis versionadas.
