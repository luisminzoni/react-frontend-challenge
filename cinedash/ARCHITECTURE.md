# Architecture (versão resumida)

## Contexto
Este projeto segue um **FSD** com foco em clareza e manutenção.

---

## O que foi exigência do teste
- React + TypeScript + Vite
- TanStack Query
- Zustand
- Tailwind + componentes reutilizáveis
- Vitest + RTL

Essas escolhas já vieram como direção do desafio, então a implementação priorizou boa execução e organização.

---

## O que foi decisão de implementação
- Separar por camadas (`app`, `shared`, `entities`, `features`, `pages`, `widgets`) para evitar acoplamento.
- Usar componentes compostos no dashboard para facilitar manutenção.
- Centralizar query keys para cache previsível.
- Persistir estado essencial no Zustand (tema, auth fake, favoritos, filtros).

---

## Estrutura de pastas (resumo)
- `src/app`: inicialização da aplicação e configuração global.
- `src/shared`: utilitários e UI base reutilizável.
- `src/entities`: domínio (movie, auth, theme).
- `src/features`: funcionalidades principais (dashboard, tabela, filtros).
- `src/pages`: telas finais usadas na navegação.
- `src/widgets`: espaço para composições maiores (quando necessário).

Objetivo: deixar cada responsabilidade no lugar certo e facilitar evolução.

---

## Autenticação sem backend
Foi implementada autenticação simulada:
- validação no formulário;
- geração de token fake;
- persistência no `localStorage` via Zustand;
- controle de acesso por `isAuthenticated`.

Isso cobre o fluxo funcional de login/logout sem dependência de API de auth.

---

## Sobre “desafios com API do Google”
Neste projeto, a API usada foi **TMDB**.

Desafios reais enfrentados na integração:
- normalizar respostas para o modelo interno;
- montar URL completa de poster (o path vinha relativo);
- manter loading/erro consistente;
- organizar query keys para cache correto.

---

## Resumo final
A arquitetura final equilibra:
- aderência ao que o teste pediu;
- organização para manutenção;
- implementação prática sem complexidade desnecessária.