import { useMovieDetails } from '@/entities/movie/hooks/useMovieDetails';
import { movieApi } from '@/entities/movie/api/movieApi';
import { useQuery } from '@tanstack/react-query';
import { useMovieFavoritesStore } from '@/entities/movie/store/movieFavoritesStore';

interface Props {
	movieId?: string;
}

export function MovieDetailPage({ movieId: movieIdProp }: Props) {
	const id = movieIdProp ?? String(window.location.pathname.split('/').pop() || '');

	const { data: movie, isLoading } = useMovieDetails(id as string);

	const { data: credits } = useQuery({
		queryKey: ['movie', id, 'credits'],
		queryFn: () => movieApi.getMovieCredits(id as string),
		enabled: !!id,
	});

	const { data: videos } = useQuery({
		queryKey: ['movie', id, 'videos'],
		queryFn: () => movieApi.getMovieVideos(id as string),
		enabled: !!id,
	});

	const toggleFavorite = useMovieFavoritesStore((s) => s.toggleFavorite);
	const isFav = useMovieFavoritesStore((s) => s.isFavorite(id as string));

	if (isLoading || !movie) return <div className="p-6">Carregando...</div>;

	const trailer = (videos?.results || []).find((v: any) => v.site === 'YouTube' && /trailer/i.test(v.type));

	return (
		<div className="p-6">
			<div className="flex flex-col md:flex-row items-start gap-6">
				<div>
					{movie.posterPath && <img src={movie.posterPath} alt={movie.title} className="w-48 rounded" />}
				</div>
				<div className="flex-1">
					<h2 className="text-2xl font-semibold">{movie.title}</h2>
					<div className="text-sm text-muted-foreground mb-2">{movie.releaseDate}</div>
					<div className="mb-4">Avaliação: {movie.rating.toFixed(1)}</div>
					<div className="mb-4">{movie.overview}</div>
					<button onClick={() => toggleFavorite(movie)} className="px-3 py-1 border rounded">
						{isFav ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista'}
					</button>
				</div>
			</div>

			<div className="mt-6">
				<h3 className="text-lg font-medium">Elenco</h3>
				<div className="grid grid-cols-3 gap-2 mt-2">
					{(credits?.cast || []).slice(0, 12).map((c: any) => (
						<div key={c.credit_id || c.id} className="p-2 border rounded">
							<div className="font-medium">{c.name}</div>
							<div className="text-sm text-muted-foreground">{c.character}</div>
						</div>
					))}
				</div>
			</div>

			{trailer && (
				<div className="mt-6 hidden md:block">
					<h3 className="text-lg font-medium">Trailer</h3>
					<div className="mt-2">
						<iframe
							title="trailer"
							width="560"
							height="315"
							src={`https://www.youtube.com/embed/${trailer.key}`}
							frameBorder="0"
							allowFullScreen
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default MovieDetailPage;

