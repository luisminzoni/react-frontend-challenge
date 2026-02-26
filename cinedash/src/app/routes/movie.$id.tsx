// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { MovieDetailPage } from '@/pages/movie-detail/MovieDetailPage';

export const Route = createFileRoute('/movie/$id')({
  component: MovieDetailPage,
});