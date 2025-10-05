# Micronaut React Skeleton

Este projeto é um skeleton moderno e completo para desenvolvimento full-stack, combinando Micronaut no backend e React no frontend. Inclui um sistema de blog funcional com suporte a Markdown.

## Executando o Projeto

### Backend

```bash
# Bash
export FRONTEND_URL=http://localhost:5173 && \
    mvn clean mn:run -Dmicronaut.test.resources.enabled=false

# PowerShell
$env:FRONTEND_URL="http://localhost:5173"; mvn clean mn:run -Dmicronaut.test.resources.enabled=false
```

### Frontend

```bash
npm run dev
```

## Sistema de Blog com Suporte a Markdown

O projeto implementa um sistema de blog completo com:

- **API REST**: Endpoints para gerenciar posts (listar, criar, atualizar, deletar)
- **Entidade BlogPost**: Com campos `id`, `title`, `slug`, `content` (Markdown), `createdAt`, `updatedAt`
- **Navegação**: Páginas para listar posts (`/blog`), visualizar post (`/blog/:slug`), criar (`/blog/new`) e editar (`/blog/edit/:slug`)
- **Editor Markdown**: Suporte completo para edição e visualização de Markdown
- **Migrações**: Scripts Flyway para criação e manutenção das tabelas no banco de dados

### Funcionalidades do Blog

- **Criação de Posts**: Interface amigável com editor Markdown integrado
- **Visualização**: Renderização de Markdown com `react-markdown` e suporte a GFM (GitHub Flavored Markdown)
- **Slugs**: Geração automática de slugs amigáveis para URL a partir do título
- **Validação**: Controle de tamanho do conteúdo e validação de campos obrigatórios
- **Salvamento Automático**: Rascunhos são salvos automaticamente no localStorage durante a edição

## Arquitetura e Tecnologias

### Backend (Java/Micronaut)

- **Framework**: Micronaut 4.8.2 (com suporte a Project Reactor para programação reativa)
- **Linguagem**: Java 21
- **Persistência**:
  - Micronaut Data JDBC para acesso a dados
  - PostgreSQL em produção com Flyway para migrations
  - H2 em memória para desenvolvimento e testes
- **API**: REST com validação Jakarta, serialização Jackson e documentação OpenAPI
- **Segurança**: CORS configurado para permitir requisições do frontend

### Frontend (React/TypeScript)

- **Framework**: React 19.1.0 com TypeScript 5.8.3
- **Build**: Vite 6.3.5
- **UI**: Material-UI 7.1.1 com suporte a temas claro/escuro
- **Estado**:
  - Zustand 5.0.5 para gerenciamento de estado global
  - TanStack React Query 5.80.6 para gerenciamento de estado servidor
- **Roteamento**: React Router DOM 7.6.2
- **Markdown**: React Markdown com suporte a GitHub Flavored Markdown (GFM)
- **Editor**: @uiw/react-md-editor com preview em tempo real
- **HTTP**: Axios 1.9.0 para comunicação com a API

## Estrutura de Pastas

### Backend

```
backend/
├── src/
│   ├── main/
│   │   ├── java/mn_react/
│   │   │   ├── controllers/     # Controladores REST
│   │   │   ├── entities/        # Entidades JPA
│   │   │   ├── repositories/    # Repositórios de dados
│   │   │   └── services/        # Lógica de negócio
│   │   └── resources/
│   │       ├── application.yml  # Configuração Micronaut
│   │       └── db/migration/    # Scripts Flyway
│   └── test/                    # Testes unitários e de integração
```

### Frontend

```
frontend/
├── public/              # Ativos estáticos
├── src/
│   ├── assets/          # Imagens e recursos
│   ├── components/      # Componentes reutilizáveis
│   │   └── MarkdownRenderer/  # Renderizador de Markdown customizado
│   ├── layouts/         # Layouts da aplicação
│   ├── pages/           # Componentes de página
│   │   └── BlogPage/    # Páginas relacionadas ao blog
│   ├── services/        # Serviços para API
│   └── store/           # Gerenciamento de estado global
```

## Particularidades Técnicas

- **Migrations Banco de Dados**: Suporte a colunas TEXT para conteúdo longo em Markdown
- **Renderização Markdown**: Componente personalizado com estilos Material-UI
- **Tema Adaptativo**: Alternância entre temas claro e escuro, persistente entre sessões
- **React Query**: Cache e invalidação inteligente para otimizar requisições à API
- **TypeScript**: Configurado com modo estrito para maior segurança de tipos

Este projeto oferece uma base robusta e moderna para desenvolvimento full-stack com as mais recentes tecnologias Java e JavaScript.