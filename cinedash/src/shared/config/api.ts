export const config = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3',
  apiKey: import.meta.env.VITE_TMDB_API_KEY || '',
};