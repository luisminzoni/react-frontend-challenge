import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../api/movieApi';
import { movieQueryKeys } from '../api/movieQueryKeys';

export function useMovieGenres() {
  return useQuery({
    queryKey: movieQueryKeys.genres(),
    queryFn: () => movieApi.getGenres(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export default useMovieGenres;
