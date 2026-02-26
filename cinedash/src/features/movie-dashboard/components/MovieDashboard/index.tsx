import { MovieDashboardRoot } from './composition/MovieDashboardRoot';
import { MovieDashboardHeader } from './composition/MovieDashboardHeader';
import { MovieDashboardFilters } from './composition/MovieDashboardFilters';
import { MovieDashboardStats } from './composition/MovieDashboardStats';
import { MovieDashboardTable } from './composition/MovieDashboardTable';
import { MovieDashboardSkeleton } from './composition/MovieDashboardSkeleton';

const MovieDashboard = {
  Root: MovieDashboardRoot,
  Header: MovieDashboardHeader,
  Filters: MovieDashboardFilters,
  Stats: MovieDashboardStats,
  Table: MovieDashboardTable,
  Skeleton: MovieDashboardSkeleton,
};

export default MovieDashboard;