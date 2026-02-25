import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../api/movieApi';

export function useMovieGenres() {
  return useQuery({
    queryKey: ['movies', 'genres'],
    queryFn: () => movieApi.getGenres(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export default useMovieGenres;
