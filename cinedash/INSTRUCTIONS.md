# INSTRUCTIONS

## Projeto escolhido
O projeto escolhido foi o **CineDash**, uma aplicação web para exploração de filmes usando a API do TMDB.

Principais pontos implementados:
- Dashboard com listagem, busca e filtros.
- Página de detalhe do filme.
- Favoritos e preferências persistidas com Zustand.
- Consumo de API com TanStack Query.
- Interface em React + TypeScript + Vite.

---

## Como rodar o projeto

### 1) Pré-requisitos
- Node.js (recomendado: versão 20+)
- npm

### 2) Acesse a pasta do projeto
```bash
cd cinedash
```

### 3) Instale as dependências
```bash
npm install
```

### 4) Configure variáveis de ambiente
Crie um arquivo `.env.local` na raiz de `cinedash` com:

```env
VITE_TMDB_API_KEY=SUA_CHAVE_TMDB
VITE_API_BASE_URL=https://api.themoviedb.org/3
```

> A chave pode ser gerada no portal do TMDB.

### 5) Rode em desenvolvimento
```bash
npm run dev
```

Abra a URL exibida no terminal (normalmente `http://localhost:5173`).

---

## Scripts úteis
- `npm run dev`: inicia o ambiente de desenvolvimento.
- `npm run test:coverage`: executa testes com relatório de cobertura.

---

## Observações
- Se a chave TMDB estiver ausente ou inválida, as requisições de filmes podem falhar.
- O estado de tema/auth/favoritos é persistido localmente no navegador.
