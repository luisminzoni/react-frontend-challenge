import { httpClient } from '@/shared/api/httpClient';
import { config } from '@/shared/config/api';
import { Movie, MovieFilters } from '../model/types';
import { MovieApiResponse, MovieDetailsApiResponse } from './movieApi.types';
import { mapApiMovieToMovie, mapApiMovieDetailsToMovie } from '../model/mappers';

export const movieApi = {
  async getMovies(filters: MovieFilters): Promise<{ movies: Movie[]; totalPages: number }> {
    const params = new URLSearchParams({
      api_key: config.apiKey,
      ...(filters.query && { query: filters.query }),
      ...(filters.genre && { with_genres: filters.genre }),
      // For discover endpoint TMDb expects `primary_release_year`.
      // For search endpoint `year` can be used. We'll add the appropriate param later.
      ...(filters.rating && { 'vote_average.gte': String(filters.rating) }),
      page: String(filters.page || 1),
    });

    // If filtering by query we use the search endpoint which accepts `year`.
    if (filters.query) {
      if (filters.year) {
        params.set('year', String(filters.year));
      }
      const response = await httpClient.get<MovieApiResponse>('/search/movie', { params });
      return {
        movies: response.data.results.map(mapApiMovieToMovie),
        totalPages: response.data.total_pages,
      };
    }

    // For discovery (no query) use `primary_release_year` if year is provided.
    if (filters.year) {
      params.set('primary_release_year', String(filters.year));
    }

    const response = await httpClient.get<MovieApiResponse>('/discover/movie', { params });

    return {
      movies: response.data.results.map(mapApiMovieToMovie),
      totalPages: response.data.total_pages,
    };
  },

  async getMovieById(id: string): Promise<Movie> {
    const response = await httpClient.get<MovieDetailsApiResponse>(`/movie/${id}`, {
      params: { api_key: config.apiKey },
    });

    return mapApiMovieDetailsToMovie(response.data);
  },

  async getGenres(): Promise<{ id: string; name: string }[]> {
    const response = await httpClient.get<{ genres: { id: number; name: string }[] }>(
      '/genre/movie/list',
      { params: { api_key: config.apiKey } }
    );

    return response.data.genres.map((g) => ({
      id: String(g.id),
      name: g.name,
    }));
  },
};