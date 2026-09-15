# Divisão de Papéis e Stack Tecnológico

A proposta divide o trabalho simulando uma *squad* ágil: cada integrante
(ou subgrupo) foca em uma especialidade, integrando tudo ao final.

## 👤 Integrante A — Front-end

Focado na experiência do usuário, performance e confiabilidade da interface.

| Área | Ferramenta / Prática |
|---|---|
| Estilização | SASS/SCSS (boas práticas: mixins, aninhamento) |
| Performance | Lazy Loading, minificação, otimização de imagem |
| Métrica de performance | Google Lighthouse Score > 80 |
| Animações | CSS/Keyframes nativos (sem depender de libs pesadas) |
| Testes unitários | Jest |
| Testes E2E | Cypress |

## ⚙️ Integrante B — Back-end & DevOps

Focado na regra de negócio, segurança, arquitetura distribuída e infraestrutura.

| Área | Ferramenta / Prática |
|---|---|
| API | RESTful — Node.js + Express (alternativa: Spring Boot) |
| Segurança | CORS, Rate-limiting (anti DDoS/Brute force), JWT ou OAuth |
| Arquitetura avançada | Microsserviço isolado de alertas de preço |
| Mensageria | RabbitMQ, Redis Pub/Sub ou Kafka |
| DevOps | CI/CD via GitHub Actions (roda testes antes do deploy) |

## Observação

Em equipes de 3–4 pessoas, os papéis A e B podem ser subdivididos
(ex.: uma dupla cuida do front, outra do back + DevOps), mas a
integração final é responsabilidade de todo o time.
