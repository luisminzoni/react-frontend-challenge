export interface MovieApiResult {
  id: number;
  title: string;
  overview?: string;
  vote_average?: number;
  release_date?: string | null;
  genre_ids?: number[];
  poster_path?: string | null;
}

export interface MovieApiResponse {
  page: number;
  results: MovieApiResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailsApiResponse {
  id: number;
  title: string;
  overview?: string;
  vote_average?: number;
  release_date?: string | null;
  genres?: { id: number; name: string }[];
  poster_path?: string | null;
}

export default MovieApiResponse;
