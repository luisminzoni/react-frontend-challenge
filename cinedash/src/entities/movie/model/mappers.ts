import { Movie } from './types';
import { MovieApiResult, MovieDetailsApiResponse } from '@/entities/movie/api/movieApi.types';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function mapPosterPath(posterPath?: string | null): string | null {
  if (!posterPath) return null;
  if (/^https?:\/\//i.test(posterPath)) return posterPath;
  return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
}

export function mapApiMovieToMovie(api: MovieApiResult): Movie {
  return {
    id: String(api.id),
    title: api.title,
    overview: api.overview || '',
    rating: api.vote_average ?? 0,
    releaseDate: api.release_date ?? '',
    genres: (api.genre_ids || []).map(String),
    posterPath: mapPosterPath(api.poster_path),
  };
}

export function mapApiMovieDetailsToMovie(api: MovieDetailsApiResponse): Movie {
  return {
    id: String(api.id),
    title: api.title,
    overview: api.overview || '',
    rating: api.vote_average ?? 0,
    releaseDate: api.release_date ?? '',
    genres: (api.genres || []).map((g) => String(g.id)),
    posterPath: mapPosterPath(api.poster_path),
  };
}

export default mapApiMovieToMovie;
