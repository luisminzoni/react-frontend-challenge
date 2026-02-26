import { MovieFilters } from '../model/types';

export const movieQueryKeys = {
  all: ['movies'] as const,
  lists: () => [...movieQueryKeys.all, 'list'] as const,
  list: (filters: MovieFilters) => [...movieQueryKeys.lists(), filters] as const,
  details: () => [...movieQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...movieQueryKeys.details(), id] as const,
  genres: () => [...movieQueryKeys.all, 'genres'] as const,
  credits: (id: string) => [...movieQueryKeys.all, 'credits', id] as const,
  videos: (id: string) => [...movieQueryKeys.all, 'videos', id] as const,
  stats: (filters: MovieFilters) => [...movieQueryKeys.all, 'stats', filters] as const,
};