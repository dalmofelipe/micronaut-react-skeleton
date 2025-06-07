



# 1. Crie o projeto Vite com React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2. Instale as dependências principais
npm install

# 3. Instale Axios, React Query, Zustand e MUI
npm install axios @tanstack/react-query zustand @mui/material @emotion/react @emotion/styled

# 4. Instale o Jest e utilitários para testes com React + TypeScript
npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# 5. Opcional: Instale o jest-environment-jsdom (caso necessário)
npm install --save-dev jest-environment-jsdom

# 6. Inicialize a configuração do Jest
npx ts-jest config:init