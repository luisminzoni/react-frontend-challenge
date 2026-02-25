import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '../model/types';

interface MovieFavoritesStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  toggleFavorite: (movie: Movie) => void;
}

export const useMovieFavoritesStore = create<MovieFavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),
      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),
      isFavorite: (movieId) =>
        get().favorites.some((m) => m.id === movieId),
      toggleFavorite: (movie) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(movie.id)) {
          removeFavorite(movie.id);
        } else {
          addFavorite(movie);
        }
      },
    }),
    {
      name: 'movie-favorites-storage',
    }
  )
);