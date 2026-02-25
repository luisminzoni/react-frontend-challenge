import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MovieFilters } from '../model/types';

interface MovieUiStore {
  filters: MovieFilters;
  selectedMovieId: string | null;
  setFilters: (filters: Partial<MovieFilters>) => void;
  setSelectedMovieId: (id: string | null) => void;
  resetFilters: () => void;
}

const defaultFilters: MovieFilters = {
  query: '',
  genre: '',
  year: '',
  rating: 0,
  page: 1,
};

export const useMovieUiStore = create<MovieUiStore>()(
  devtools(
    (set) => ({
      filters: defaultFilters,
      selectedMovieId: null,
      setFilters: (newFilters) =>
        set((state) => {
          // If caller explicitly provided a page, use it.
          if (newFilters.page !== undefined) {
            return { filters: { ...state.filters, ...newFilters } };
          }

          // If any filter key other than page is changing, reset page to 1.
          const changingKeys = Object.keys(newFilters).filter((k) => k !== 'page');
          if (changingKeys.length > 0) {
            return { filters: { ...state.filters, ...newFilters, page: 1 } };
          }

          // No page provided and no other filter keys -> no-op (keep current page)
          return { filters: { ...state.filters, ...newFilters } };
        }),
      setSelectedMovieId: (id) => set({ selectedMovieId: id }),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    { name: 'MovieUiStore' }
  )
);