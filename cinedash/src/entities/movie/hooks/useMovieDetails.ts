import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../api/movieApi';
import { movieQueryKeys } from '../api/movieQueryKeys';

export function useMovieDetails(movieId: string) {
  return useQuery({
    queryKey: movieQueryKeys.detail(movieId),
    queryFn: () => movieApi.getMovieById(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutos para detalhes
  });
}