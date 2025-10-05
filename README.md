## Skeleton Micronaut React

### Backend

    #bash
    export FRONTEND_URL=http://localhost:5173 && \
        mvn clean mn:run -Dmicronaut.test.resources.enabled=false

    #powershell
    $env:FRONTEND_URL="http://localhost:5173"; mvn clean mn:run -Dmicronaut.test.resources.enabled=false

### Frontend

    npm run dev

### Blog System

O projeto agora inclui um sistema de blog simplificado com suporte a Markdown:

- **Backend**: API REST para posts com campos title, slug, content (Markdown), createdAt, updatedAt
- **Frontend**: Páginas para listar posts (/blog) e visualizar individual (/blog/:slug) com renderização Markdown
- **Tecnologias**: React Markdown, Material-UI, React Query

Para testar:
1. Inicie o frontend: `npm run dev`
2. Acesse http://localhost:5173/blog para ver a lista de posts
3. Use Postman para criar posts via POST /posts com JSON contendo title, slug, content

## Tecnologias Utilizadas

### Backend (Java/Micronaut)
- **Framework Principal**: Micronaut 4.8.2
- **Linguagem**: Java 21
- **Build Tool**: Maven
- **Banco de Dados**:
  - PostgreSQL (produção, via Flyway migrations)
  - H2 (testes, in-memory)
- **ORM**: JPA/Hibernate com Micronaut Data JDBC
- **Serialização**: Jackson (via Micronaut Serde)
- **Validação**: Jakarta Validation API
- **HTTP Server**: Netty
- **Reatividade**: Project Reactor
- **Migrações**: Flyway
- **Logging**: Logback
- **Testes**: JUnit 5, Mockito, AssertJ
- **Outros**: Lombok (anotações), OpenAPI (documentação), CORS habilitado

### Frontend (React/TypeScript)
- **Framework**: React 19.1.0
- **Linguagem**: TypeScript 5.8.3
- **Build Tool**: Vite 6.3.5
- **UI Library**: Material-UI (MUI) 7.1.1 com Emotion
- **Roteamento**: React Router DOM 7.6.2
- **Estado**: Zustand 5.0.5
- **Data Fetching**: TanStack React Query 5.80.6
- **HTTP Client**: Axios 1.9.0
- **Testes**: Jest 29.7.0 com Testing Library
- **Linting**: ESLint 9.25.0 com TypeScript ESLint
- **Configuração**: TSConfig com modo estrito, JSX react-jsx, target ES2020

### Arquitetura Geral
- **Padrão**: Full-stack com separação clara entre backend (API REST) e frontend (SPA)
- **Comunicação**: Backend expõe API via Micronaut, frontend consome via Axios/React Query
- **Estado**: Gerenciado no frontend com Zustand
- **Tema/UI**: Material-UI com suporte a temas customizados
- **CORS**: Configurado para permitir requisições do frontend (porta 5000 por padrão)

### Observações da Validação
- O projeto está configurado para desenvolvimento local com H2 e produção com PostgreSQL
- Build do frontend foi executado com sucesso (npm install)
- Backend tem dependências para AOT compilation (GraalVM) mas desabilitado
- Estrutura de pastas segue convenções padrão para ambos os frameworks
- Testes configurados em ambos os lados

Essa validação confirma que o projeto é um skeleton moderno e bem-configurado para desenvolvimento full-stack com tecnologias atuais e estáveis.