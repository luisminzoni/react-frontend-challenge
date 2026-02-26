import { describe, expect, it } from 'vitest';
import { movieQueryKeys } from './movieQueryKeys';

describe('movieQueryKeys', () => {
  it('gera chave estável para lista com filtros', () => {
    const filters = { query: 'batman', genre: '28', page: 2 };

    expect(movieQueryKeys.list(filters)).toEqual(['movies', 'list', filters]);
  });

  it('gera chave de detalhe por id', () => {
    expect(movieQueryKeys.detail('123')).toEqual(['movies', 'detail', '123']);
  });

  it('gera chaves de credits/videos por id', () => {
    expect(movieQueryKeys.credits('10')).toEqual(['movies', 'credits', '10']);
    expect(movieQueryKeys.videos('10')).toEqual(['movies', 'videos', '10']);
  });

  it('gera chave de gêneros centralizada', () => {
    expect(movieQueryKeys.genres()).toEqual(['movies', 'genres']);
  });
});
