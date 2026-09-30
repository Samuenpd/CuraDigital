# Backend — API da Plataforma de Ofertas

API REST em Node.js e Express, com persistência SQLite, autenticação JWT, controle de acesso, CORS e limitação de requisições. A aplicação serve imagens em `/imagens`, disponibiliza `GET /health` e organiza rotas, controllers, serviços e modelos em módulos separados.

## Executar localmente

1. Instale as dependências com `npm ci`.
2. Configure as variáveis `PORT`, `CORS_ORIGIN`, `JWT_SECRET` e `REDIS_URL` (consulte o guia de setup na raiz).
3. Inicie o Redis com `docker compose up -d redis` na raiz.
4. Execute `npm run seed` para carregar ofertas de demonstração.
5. Inicie a API com `npm start` (porta padrão `3000`).

## Verificações

- `npm test`: testes automatizados Jest.
- `npm run test:unit`: testes unitários.
- `npm run test:integration`: testes de integração da API.

As operações que alteram ofertas exigem JWT. Configure um segredo forte fora do código antes de qualquer implantação.
