# Relatório do Projeto — Plataforma de Ofertas

**Janela de apresentação e entrega:** 30/09 a 07/10  
**Equipe:** 2 a 4 integrantes  
**Tipo:** aplicação Web Full Stack com serviço de notificações assíncrono

## 1. Objetivo

Construir uma plataforma web responsiva para consultar ofertas, visualizar detalhes e conduzir o fluxo de compra. A solução separa a interface da API e isola o processamento de alertas de preço em um serviço que recebe eventos por fila.

## 2. Tecnologias e responsabilidades

| Área | Tecnologias | Responsabilidade |
|---|---|---|
| Front-end | React, Vite, React Router, SCSS | Interface, páginas de ofertas, autenticação na navegação e fluxo de checkout |
| API | Node.js, Express, SQLite, JWT | Rotas REST, regras de negócio, persistência, autorização e publicação de eventos |
| Mensageria | Redis, BullMQ | Fila `alertas-preco`, retentativas e entrega assíncrona de eventos |
| Notificações | Node.js, BullMQ Worker | Consumo dos eventos e processamento isolado de alertas |
| Automação | GitHub Actions | Testes do backend, build de produção do frontend e validação sintática do consumidor |

Os integrantes devem registrar no grupo os nomes e a divisão efetiva das tarefas, pois esses dados não estão definidos no repositório.

## 3. Arquitetura e fluxo principal

1. O navegador carrega a SPA e consulta os endpoints de ofertas da API.
2. A API aplica CORS e limite geral de requisições; endpoints protegidos validam token JWT. O login tem limite mais restrito.
3. Quando o preço de uma oferta diminui, a regra de negócio publica `novo_alerta_preco` na fila `alertas-preco`.
4. O serviço de notificações consome o job e envia um POST para um webhook configurável; sem webhook, registra uma simulação no console. Falhas são devolvidas ao BullMQ, que tenta o job novamente até três vezes com espera exponencial.

O Redis é compartilhado pelo produtor e consumidor e é iniciado pelo Docker Compose. A aplicação SQLite e Redis são apropriadas para demonstração local; disponibilidade, persistência e escala de produção exigiriam infraestrutura adicional.

## 4. Segurança implementada

- CORS configurável por `CORS_ORIGIN`.
- JWT nas rotas protegidas, com segredo configurável por `JWT_SECRET`.
- Limite geral de 200 requisições por janela de 15 minutos e limite de login de 10 tentativas por janela.
- Senhas tratadas pelo serviço de autenticação com bcrypt.
- Middleware central de tratamento de erros.

Antes de publicar, definir segredo JWT forte no ambiente e restringir `CORS_ORIGIN` ao domínio da aplicação. Os limites em memória devem ser revistos se a API rodar em múltiplas instâncias.

## 5. Interface e desempenho

A interface está organizada em páginas e componentes React e usa SCSS, variáveis e mixins. O Vite gera build de produção. Há marcação de imagens com carregamento adiado a revisar nas páginas.

**Lighthouse:** a CI executa Lighthouse em modo mobile três vezes no build de produção e exige score de performance mínimo 81/100. Os relatórios são publicados como artefato da execução. A meta só estará comprovada após uma execução bem-sucedida no GitHub Actions.

## 6. Testes e integração contínua

O backend contém testes Jest unitários e de integração. O workflow em `.github/workflows/ci.yml` instala dependências e executa `npm test` para a API, cria o build de produção do frontend e verifica sintaxe do consumidor de notificações.

O frontend agora contém testes Jest unitários e Cypress E2E para a vitrine, busca e navegação de detalhe. O workflow executa essas suítes, gera o build e aplica a auditoria Lighthouse. A CI está configurada, mas o deploy permanece pendente porque o repositório não define provedor, destino ou credenciais de implantação.

## 7. Estado dos critérios de avaliação

| Critério | Estado verificável no repositório | Evidência / pendência |
|---|---|---|
| Interface responsiva via SASS | Implementado; validar em dispositivos | React e SCSS em `frontend/src` |
| Lighthouse > 80 | Auditoria automatizada configurada; resultado pendente | CI exige pelo menos 81/100 e armazena relatórios como artefato |
| Jest/Cypress | Suítes implementadas; execução CI pendente | Jest no backend e frontend; Cypress cobre vitrine, busca e detalhe |
| CORS, rate-limit e JWT | Implementado | Configuração no backend; segredos e origem devem ser definidos por ambiente |
| Serviço de notificação por fila | Implementado; requer URL webhook para entrega externa | BullMQ/Redis, produtor na API e worker; simulação local se webhook não definido |
| CI/CD | CI configurada; CD aguarda destino | Workflow de CI; provedor e credenciais de deploy ainda não definidos |

## 8. Como executar a demonstração

Consulte [`05-guia-de-setup.md`](05-guia-de-setup.md) para os comandos e variáveis de ambiente. Suba Redis, API, consumidor e frontend em terminais separados. Use dados de demonstração e percorra listagem, detalhe, login e rotas protegidas; atualize o preço de uma oferta para demonstrar a publicação do alerta e observe os logs do consumidor. O log demonstra processamento assíncrono, não entrega real a usuários.

## 9. Próximas entregas recomendadas

1. Configurar variáveis locais e webhook de demonstração sem incluir segredos no repositório.
2. Executar o workflow no GitHub, corrigir eventuais falhas e guardar o link/resultado para a apresentação.
3. Escolher provedor e URL de produção e cadastrar credenciais como secrets do GitHub para habilitar deploy automatizado.
