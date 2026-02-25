import { useEffect, useState } from 'react';
import { useDebounce } from '@/shared/utils/debounce';
import { useMovieUiStore } from '@/entities/movie/store/movieUiStore';
import { useMovieGenres } from '@/entities/movie/hooks/useMovieGenres';

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
			<div className="flex flex-col md:flex-row gap-3 items-center">
				<input
					aria-label="search"
					placeholder="Buscar título..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="border rounded px-2 py-1 flex-1"
				/>

				<select value={genre} onChange={(e) => onGenreChange(e.target.value)} className="border rounded px-2 py-1">
					<option value="">Todos os gêneros</option>
					{genres?.map((g) => (
						<option key={g.id} value={g.id}>
							{g.name}
						</option>
					))}
				</select>

				<input
					type="number"
					placeholder="Ano"
					value={year}
					onChange={(e) => onYearChange(e.target.value)}
					className="border rounded px-2 py-1 w-28"
				/>

				<input
					type="number"
					placeholder="Nota mínima"
					value={rating}
					onChange={(e) => onRatingChange(Number(e.target.value))}
					className="border rounded px-2 py-1 w-28"
					min={0}
					max={10}
					step={0.1}
				/>
			</div>
		</div>
	);
}

export default MovieDashboardFilters;
