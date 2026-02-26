import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../api/movieApi';
import { movieQueryKeys } from '../api/movieQueryKeys';
import { MovieFilters, Movie } from '../model/types';

type MoviesResponse = { movies: Movie[]; totalPages: number };

export function useMovies(filters: MovieFilters) {
  return useQuery<MoviesResponse, Error>({
    queryKey: movieQueryKeys.list(filters),
    queryFn: () => movieApi.getMovies(filters),
    // keepPreviousData removed to satisfy types; pagination handling can be added later
    enabled: true,
  });
}