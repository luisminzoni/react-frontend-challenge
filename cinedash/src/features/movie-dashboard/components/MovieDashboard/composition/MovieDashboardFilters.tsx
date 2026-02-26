import { useEffect, useState } from 'react';
import { useDebounce } from '@/shared/utils/debounce';
import { useMovieUiStore } from '@/entities/movie/store/movieUiStore';
import { useMovieGenres } from '@/entities/movie/hooks/useMovieGenres';
import { ChevronDown } from 'lucide-react';

interface MovieDashboardFiltersProps {
	className?: string;
}

export function MovieDashboardFilters({ className = '' }: MovieDashboardFiltersProps) {
	const filters = useMovieUiStore((s) => s.filters);
	const setFilters = useMovieUiStore((s) => s.setFilters);

	const [query, setQuery] = useState<string>(filters.query ?? '');
	const [genre, setGenre] = useState<string>(filters.genre ?? '');
	const [year, setYear] = useState<string>(filters.year ?? '');
	const [rating, setRating] = useState<number>(filters.rating ?? 0);

	const debouncedQuery = useDebounce(query, 500);

	const { data: genres } = useMovieGenres();

	// Sync local state when store changes (e.g., when navigating pages or resetting)
	useEffect(() => {
		setQuery(filters.query ?? '');
		setGenre(filters.genre ?? '');
		setYear(filters.year ?? '');
		setRating(filters.rating ?? 0);
	}, [filters.query, filters.genre, filters.year, filters.rating]);

	// Apply debounced query to store
	useEffect(() => {
		setFilters({ query: debouncedQuery });
	}, [debouncedQuery, setFilters]);

	function onGenreChange(v: string) {
		setGenre(v);
		setFilters({ genre: v });
	}

	function onYearChange(v: string) {
		setYear(v);
		setFilters({ year: v });
	}

	function onRatingChange(v: number) {
		setRating(v);
		setFilters({ rating: v });
	}

	return (
		<div className={className}>
			<div className="bg-card p-4 rounded-lg shadow-sm mb-2">
				<div className="grid grid-cols-2 gap-3 md:flex md:flex-row md:items-center">
					<input
						aria-label="search"
						placeholder="Buscar título..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="border rounded px-3 py-2 w-full md:flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
					/>

					<input
						type="number"
						placeholder="Ano"
						value={year}
						onChange={(e) => onYearChange(e.target.value)}
						className="border rounded px-3 py-2 w-full md:w-28"
					/>

					<div className="relative w-full md:w-auto">
						<select
							value={genre}
							onChange={(e) => onGenreChange(e.target.value)}
							className="border rounded pl-3 pr-9 py-2 bg-transparent appearance-none w-full"
						>
							<option value="">Todos os gêneros</option>
							{genres?.map((g) => (
								<option key={g.id} value={g.id}>
									{g.name}
								</option>
							))}
						</select>
						<ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					</div>

					<input
						type="number"
						placeholder="Nota mínima"
						value={rating}
						onChange={(e) => onRatingChange(Number(e.target.value))}
						className="border rounded px-3 py-2 w-full md:w-28"
						min={0}
						max={10}
						step={0.1}
					/>
				</div>
			</div>
		</div>
	);
}

export default MovieDashboardFilters;
