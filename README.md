# Plataforma de Ofertas

Projeto acadêmico Full Stack para consulta de ofertas e demonstração de alertas de preço via microsserviço. Período informado para apresentação e entrega: 30/09 a 07/10.

## Componentes

- `frontend/`: SPA React/Vite com estilos SCSS.
- `backend/`: API REST Express, SQLite, JWT e publicação de jobs.
- `notification-service/`: consumidor assíncrono BullMQ.
- `docs/`: arquitetura, papéis, cronograma, setup, checklist e relatório.
- `.github/workflows/ci.yml`: verificações automáticas em push e pull request.

## Início rápido

Consulte [`docs/05-guia-de-setup.md`](docs/05-guia-de-setup.md) para configuração e comandos. O relatório de entrega está em [`docs/06-relatorio-de-entrega.md`](docs/06-relatorio-de-entrega.md).

## Situação

A estrutura funcional do produto está implementada. A pontuação Lighthouse, a suíte Cypress/frontend e o deploy ainda precisam ser produzidos/configurados para comprovar esses critérios; detalhes e próximos passos estão no relatório.
