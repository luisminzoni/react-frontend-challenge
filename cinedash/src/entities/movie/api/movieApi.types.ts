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

export interface MovieCreditsApiResponse {
  id: number;
  cast: Array<{
    cast_id?: number;
    character?: string;
    credit_id?: string;
    gender?: number | null;
    id: number;
    name: string;
    order?: number;
    profile_path?: string | null;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job?: string;
  }>;
}

export interface MovieVideosApiResponse {
  id: number;
  results: Array<{
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
}

export default MovieApiResponse;
