import { Movie } from './types';
import { MovieApiResult, MovieDetailsApiResponse } from '@/entities/movie/api/movieApi.types';

export function mapApiMovieToMovie(api: MovieApiResult): Movie {
  return {
    id: String(api.id),
    title: api.title,
    overview: api.overview || '',
    rating: api.vote_average ?? 0,
    releaseDate: api.release_date ?? '',
    genres: (api.genre_ids || []).map(String),
    posterPath: api.poster_path ?? null,
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
    posterPath: api.poster_path ?? null,
  };
}

export default mapApiMovieToMovie;
