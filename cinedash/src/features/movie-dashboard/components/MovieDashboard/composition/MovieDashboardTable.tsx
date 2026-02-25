import { useMovieUiStore } from '@/entities/movie/store/movieUiStore';
import { useMovies } from '@/entities/movie/hooks/useMovies';
import { Movie } from '@/entities/movie/model/types';
import { useMovieGenres } from '@/entities/movie/hooks/useMovieGenres';

interface MovieDashboardTableProps {
	className?: string;
}

export function MovieDashboardTable({ className = '' }: MovieDashboardTableProps) {
	const filters = useMovieUiStore((s) => s.filters);
	const setFilters = useMovieUiStore((s) => s.setFilters);
	const { data, isLoading, isError } = useMovies(filters);
	const { data: genreList } = useMovieGenres();

	if (isLoading) {
		return <div className={className}>Carregando...</div>;
	}

	if (isError) {
		return <div className={className}>Erro ao carregar filmes.</div>;
	}

	const movies: Movie[] = data?.movies ?? [];
	const genreMap = (genreList || []).reduce<Record<string, string>>((acc, g) => {
		acc[g.id] = g.name;
		return acc;
	}, {});

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
							<th className="text-left p-2">Título</th>
							<th className="text-left p-2">Ano</th>
							<th className="text-left p-2">Gêneros</th>
							<th className="text-left p-2">Avaliação</th>
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
						{movies.map((m) => (
							<tr key={m.id}>
								<td className="p-2">{m.title}</td>
								<td className="p-2">{m.releaseDate ? new Date(m.releaseDate).getFullYear() : '—'}</td>
								<td className="p-2">{(m.genres || []).slice(0, 2).map((id) => genreMap[id] ?? id).join(', ')}</td>
								<td className="p-2">{m.rating.toFixed(1)}</td>
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
