import { useState, useMemo } from 'react';
import { useMovieUiStore } from '@/entities/movie/store/movieUiStore';
import { useMovies } from '@/entities/movie/hooks/useMovies';
import { Movie } from '@/entities/movie/model/types';
import { useMovieFavoritesStore } from '@/entities/movie/store/movieFavoritesStore';
import { useMovieGenres } from '@/entities/movie/hooks/useMovieGenres';
import { useThemeStore } from '@/entities/theme/store/themeStore';
import { goToMovie } from '@/shared/lib/navigation';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

interface MovieDashboardTableProps {
	className?: string;
}

export function MovieDashboardTable({ className = '' }: MovieDashboardTableProps) {
	const filters = useMovieUiStore((s) => s.filters);
	const setFilters = useMovieUiStore((s) => s.setFilters);
	const { data, isLoading } = useMovies(filters);
	const { data: genreList } = useMovieGenres();
	const theme = useThemeStore((s) => s.theme);

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
			<Button
				variant={isFav ? 'destructive' : 'outline'}
				size="sm"
				className="rounded-[10px] px-2 py-1 text-xs focus:outline-none focus:ring-0 ring-0 shadow-sm min-w-[108px] justify-center border border-input"
				onClick={(e) => {
					e.stopPropagation();
					toggleFavorite(movie);
				}}
				aria-pressed={isFav}
				title={isFav ? 'Remover da minha lista' : 'Adicionar à minha lista'}
			>
			<Star
			size={14}
			className="transition-all"
			stroke={isFav ? '#eab308' : 'currentColor'}
			fill={isFav ? '#eab308' : 'none'}
			/>
				<span className="ml-2">{isFav ? 'Remover' : 'Favoritar'}</span>
			</Button>
		);
	}

	const totalPages = data?.totalPages ?? 1;
	const isDark = theme === 'dark';
	const showSkeleton = isLoading && movies.length === 0;

	const currentPage = filters.page ?? 1;

	function goToPage(page: number) {
		if (page < 1 || page > totalPages) return;
		setFilters({ page });
	}

	return (
		<div className={className}>
			<div className="overflow-auto">
				<Table className={isDark ? 'bg-slate-900 rounded-lg shadow-sm' : 'bg-white rounded-lg shadow-sm'}>
					<TableHeader>
						<tr>
							<TableHead className="p-3">
								<Button variant="ghost" size="sm" className="font-medium rounded-[10px] active:scale-95 active:bg-muted/30" onClick={() => toggleSort('title')}>
									Título
								</Button>
							</TableHead>
							<TableHead className="p-3 w-24">Ano</TableHead>
							<TableHead className="p-3 w-48">
								<Button variant="ghost" size="sm" className="font-medium rounded-[10px] active:scale-95 active:bg-muted/30" onClick={() => toggleSort('genre')}>
									Gêneros
								</Button>
							</TableHead>
							<TableHead className="p-3 w-28">
								<Button variant="ghost" size="sm" className="font-medium rounded-[10px] active:scale-95 active:bg-muted/30" onClick={() => toggleSort('rating')}>
									Avaliação
								</Button>
							</TableHead>
							<TableHead className="p-3 w-36">Ações</TableHead>
						</tr>
					</TableHeader>
					<TableBody className={isDark ? '[&>tr:nth-child(odd)]:bg-slate-900 [&>tr:nth-child(even)]:bg-slate-800' : '[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-gray-200'}>
						{showSkeleton &&
							Array.from({ length: 6 }).map((_, index) => (
								<TableRow key={`skeleton-row-${index}`}>
									<TableCell className="p-3 align-top"><Skeleton className="h-4 w-48" /></TableCell>
									<TableCell className="p-3 align-top"><Skeleton className="h-4 w-12" /></TableCell>
									<TableCell className="p-3 align-top"><Skeleton className="h-4 w-32" /></TableCell>
									<TableCell className="p-3 align-top"><Skeleton className="h-4 w-12" /></TableCell>
									<TableCell className="p-3 align-top"><Skeleton className="h-8 w-28 rounded-[10px]" /></TableCell>
								</TableRow>
							))}
						{!showSkeleton && movies.length === 0 && (
							<TableRow>
								<TableCell className="p-4 text-center text-muted-foreground" colSpan={5}>
									Nenhum filme encontrado.
								</TableCell>
							</TableRow>
						)}
						{!showSkeleton && sortedMovies.map((m) => (
							<TableRow key={m.id} className={isDark ? 'hover:bg-slate-700/70 cursor-pointer transition-colors' : 'hover:bg-gray-100 cursor-pointer transition-colors'} onClick={() => goToMovie(String(m.id))}>
								<TableCell className="p-3 align-top">{m.title}</TableCell>
								<TableCell className="p-3 align-top">{m.releaseDate ? new Date(m.releaseDate).getFullYear() : '—'}</TableCell>
								<TableCell className="p-3 align-top">{(m.genres || []).slice(0, 2).map((id) => genreMap[id] ?? id).join(', ')}</TableCell>
								<TableCell className="p-3 align-top">{m.rating.toFixed(1)}</TableCell>
								<TableCell className="p-3 align-top" onClick={(e) => e.stopPropagation()}>
									<FavButton movie={m} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-4">
				<div className="text-sm text-muted-foreground">Página {currentPage} de {totalPages}</div>
				<div className="flex gap-2">
					<Button variant="ghost" size="sm" className="px-3 py-1 rounded" onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>
						Anterior
					</Button>
					<Button variant="ghost" size="sm" className="px-3 py-1 rounded" onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}>
						Próxima
					</Button>
				</div>
			</div>
		</div>
	);
}

export default MovieDashboardTable;
