# Checklist técnico para avaliação

| Critério | Situação | Evidência / conclusão |
|---|---|---|
| Interface responsiva com SASS/SCSS | Implementada | SCSS responsivo em `frontend/src/styles`; revisar em dispositivos na apresentação |
| Lighthouse acima de 80 | CI configurada; resultado da execução pendente | `.lighthouserc.json` exige performance >= 81/100 e salva relatórios como artefato |
| Testes Jest e Cypress | Implementados; execução da CI pendente | Jest no backend/frontend; Cypress cobre vitrine, busca e detalhe |
| CORS, rate-limit, JWT | Implementado | Definir `JWT_SECRET` e `CORS_ORIGIN` seguros por ambiente |
| Serviço de notificação por fila | Implementado | BullMQ/Redis; configurar `NOTIFICATION_WEBHOOK_URL` para entrega externa (sem URL, roda em simulação) |
| Pipeline CI/CD | CI configurada; CD aguarda destino | `.github/workflows/ci.yml`; falta escolher hospedagem e cadastrar secrets de deploy |

Use este checklist no ensaio e atualize os itens após reunir as evidências de execução. Ver [`06-relatorio-de-entrega.md`](06-relatorio-de-entrega.md).
