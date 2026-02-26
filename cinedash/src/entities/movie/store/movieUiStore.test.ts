import { beforeEach, describe, expect, it } from 'vitest';
import { useMovieUiStore } from './movieUiStore';

describe('useMovieUiStore - regras de filtros', () => {
  beforeEach(() => {
    localStorage.removeItem('movie-ui-store');
    useMovieUiStore.setState({
      filters: {
        query: '',
        genre: '',
        year: '',
        rating: 0,
        page: 3,
      },
      selectedMovieId: null,
    });
  });

  it('reseta para página 1 ao alterar filtro sem informar página', () => {
    useMovieUiStore.getState().setFilters({ query: 'matrix' });

    expect(useMovieUiStore.getState().filters.query).toBe('matrix');
    expect(useMovieUiStore.getState().filters.page).toBe(1);
  });

  it('mantém página quando page é informado explicitamente', () => {
    useMovieUiStore.getState().setFilters({ page: 5 });

    expect(useMovieUiStore.getState().filters.page).toBe(5);
  });

  it('no-op de setFilters sem mudanças não altera página atual', () => {
    useMovieUiStore.getState().setFilters({});

    expect(useMovieUiStore.getState().filters.page).toBe(3);
  });
});
