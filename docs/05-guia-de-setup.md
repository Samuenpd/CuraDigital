# Guia de Setup (a executar quando a implementação começar)

Este guia descreve o que cada pasta vai receber quando o time iniciar a
codificação. Nada aqui foi implementado ainda — é só o roteiro.

## frontend/

- Inicializar o projeto (ex.: Vite, Create React App ou similar — a definir pelo time).
- Configurar SASS/SCSS apontando para `src/styles/`.
- Configurar Jest para `frontend/tests/unit`.
- Configurar Cypress para `frontend/tests/e2e/cypress`.
- Rodar auditoria Lighthouse antes de cada entrega parcial.

## backend/

- Inicializar projeto Node.js (`npm init`) ou Spring Boot, conforme decisão do time.
- Se Node/Express: middlewares de CORS e rate-limiting em `src/middlewares/`.
- Autenticação (JWT/OAuth) em `src/config/` e `src/middlewares/`.
- Rotas REST em `src/routes/`, lógica de negócio em `src/controllers/` e `src/services/`.

## notification-service/

- Serviço isolado, com seu próprio `package.json`.
- Consumidor da fila em `src/consumers/`.
- Se o backend precisar publicar eventos, o producer correspondente fica
  em `notification-service/src/producers/` (ou dentro do backend, a
  depender de onde o time decidir publicar o evento).

## .github/workflows/

- Pipeline de CI/CD (`ci.yml`) para rodar testes automaticamente a cada push/PR,
  antes de permitir o deploy.
