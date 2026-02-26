# CineDash

Aplicação web para explorar filmes usando a API do TMDB.

## Stack
- React 19
- TypeScript
- Vite
- TanStack Query
- Zustand
- Tailwind CSS
- Vitest + React Testing Library

## Como rodar
1. Entre na pasta do projeto:
   ```bash
   cd cinedash
   ```
2. Instale dependências:
   ```bash
   npm install
   ```
3. Crie o arquivo `.env.local`:
   ```env
   VITE_TMDB_API_KEY=SUA_CHAVE_TMDB
   VITE_API_BASE_URL=https://api.themoviedb.org/3
   ```
4. Inicie o projeto:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev`
- `npm run test:coverage`

## Documentação complementar
- `INSTRUCTIONS.md`: guia rápido do projeto e execução.
- `ARCHITECTURE.md`: resumo das decisões arquiteturais.
