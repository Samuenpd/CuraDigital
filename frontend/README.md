# Frontend — Plataforma de Ofertas

Single-page application em React, Vite e SCSS. Inclui navegação para ofertas, detalhe, cadastro/login, checkout, pagamento e administração de ofertas; as rotas de compra e administração são protegidas por autenticação.

## Executar localmente

1. Instale as dependências com `npm ci`.
2. Defina `VITE_API_URL` com a URL da API (padrão local documentado na raiz).
3. Execute `npm run dev` para abrir o servidor Vite.
4. Gere a versão otimizada com `npm run build`.

O projeto possui folhas SCSS com variáveis e mixins. `npm test` executa a suíte Jest unitária; `npm run test:e2e` executa Cypress em modo headless. O workflow também gera o build e executa Lighthouse, exigindo score de performance >= 81/100.
