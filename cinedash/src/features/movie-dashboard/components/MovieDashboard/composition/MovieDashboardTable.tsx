import { useState, useMemo } from 'react';
import { useMovieUiStore } from '@/entities/movie/store/movieUiStore';
import { useMovies } from '@/entities/movie/hooks/useMovies';
import { Movie } from '@/entities/movie/model/types';
import { useMovieFavoritesStore } from '@/entities/movie/store/movieFavoritesStore';
import { useMovieGenres } from '@/entities/movie/hooks/useMovieGenres';
import { goToMovie } from '@/shared/lib/navigation';

interface MovieDashboardTableProps {
	className?: string;
}

export function MovieDashboardTable({ className = '' }: MovieDashboardTableProps) {
	const filters = useMovieUiStore((s) => s.filters);
	const setFilters = useMovieUiStore((s) => s.setFilters);
	const { data } = useMovies(filters);
	const { data: genreList } = useMovieGenres();

	const movies: Movie[] = data?.movies ?? [];
	const genreMap = (genreList || []).reduce<Record<string, string>>((acc, g) => {
		acc[g.id] = g.name;
		return acc;
	}, {});

	// Sorting state (client-side)
	const [sortKey, setSortKey] = useState<'title' | 'genre' | 'rating' | null>(null);
	const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

	function toggleSort(key: 'title' | 'genre' | 'rating') {
		if (sortKey === key) {
			setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortKey(key);
			setSortDir('asc');
		}
	}

	const sortedMovies = useMemo(() => {
		if (!sortKey) return movies;
		const copy = [...movies];
		copy.sort((a, b) => {
			let va: string | number = '';
			let vb: string | number = '';
			switch (sortKey) {
				case 'title':
					va = a.title.toLowerCase();
					vb = b.title.toLowerCase();
					break;
				case 'genre':
					va = (a.genres[0] && genreMap[a.genres[0]]) || a.genres[0] || '';
					vb = (b.genres[0] && genreMap[b.genres[0]]) || b.genres[0] || '';
					va = String(va).toLowerCase();
					vb = String(vb).toLowerCase();
					break;
				case 'rating':
					va = a.rating;
					vb = b.rating;
					break;
			}

			if (va < vb) return sortDir === 'asc' ? -1 : 1;
			if (va > vb) return sortDir === 'asc' ? 1 : -1;
			return 0;
		});
		return copy;
	}, [movies, sortKey, sortDir, genreMap]);

	// Favorite toggle button component
	function FavButton({ movie }: { movie: Movie }) {
		const toggleFavorite = useMovieFavoritesStore((s) => s.toggleFavorite);
		const isFav = useMovieFavoritesStore((s) => s.isFavorite(movie.id));
		return (
			<button
				onClick={() => toggleFavorite(movie)}
				className="px-2 py-1 border rounded"
				aria-pressed={isFav}
			>
				{isFav ? '★ Remover' : '☆ Favoritar'}
			</button>
		);
	}

	const totalPages = data?.totalPages ?? 1;

	const currentPage = filters.page ?? 1;

	function goToPage(page: number) {
		if (page < 1 || page > totalPages) return;
		setFilters({ page });
	}

	return (
		<div className={className}>
			<div className="overflow-auto">
				<table className="min-w-full table-auto">
					<thead>
								<tr>
									<th className="text-left p-2">
										<button onClick={() => toggleSort('title')} className="font-medium">
											Título
										</button>
									</th>
									<th className="text-left p-2">Ano</th>
									<th className="text-left p-2">
										<button onClick={() => toggleSort('genre')} className="font-medium">
											Gêneros
										</button>
									</th>
									<th className="text-left p-2">
										<button onClick={() => toggleSort('rating')} className="font-medium">
											Avaliação
										</button>
									</th>
									<th className="text-left p-2">Ações</th>
								</tr>
					</thead>
					<tbody>
						{movies.length === 0 && (
							<tr>
								<td className="p-2" colSpan={4}>
									Nenhum filme encontrado.
								</td>
							</tr>
						)}
						{sortedMovies.map((m) => (
							<tr key={m.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => goToMovie(String(m.id))}>
								<td className="p-2">{m.title}</td>
								<td className="p-2">{m.releaseDate ? new Date(m.releaseDate).getFullYear() : '—'}</td>
								<td className="p-2">{(m.genres || []).slice(0, 2).map((id) => genreMap[id] ?? id).join(', ')}</td>
								<td className="p-2">{m.rating.toFixed(1)}</td>
								<td className="p-2" onClick={(e) => e.stopPropagation()}>
									<FavButton movie={m} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-between mt-4">
				<div className="text-sm text-muted-foreground">
					Página {currentPage} de {totalPages}
				</div>
				<div className="flex gap-2">
					<button
						onClick={() => goToPage(currentPage - 1)}
						disabled={currentPage <= 1}
						className="px-3 py-1 border rounded disabled:opacity-50"
					>
						Anterior
					</button>
					<button
						onClick={() => goToPage(currentPage + 1)}
						disabled={currentPage >= totalPages}
						className="px-3 py-1 border rounded disabled:opacity-50"
					>
						Próxima
					</button>
				</div>
			</div>
		</div>
	);
}

export default MovieDashboardTable;
