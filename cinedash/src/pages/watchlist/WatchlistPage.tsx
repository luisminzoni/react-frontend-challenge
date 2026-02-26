import { useMovieFavoritesStore } from '@/entities/movie/store/movieFavoritesStore';
import { useMovieGenres } from '@/entities/movie/hooks/useMovieGenres';
import { Button } from '@/components/ui/button';

export function WatchlistPage() {
  const favorites = useMovieFavoritesStore((s) => s.favorites);
  const removeFavorite = useMovieFavoritesStore((s) => s.removeFavorite);
  const { data: genreList } = useMovieGenres();

  const genreMap = (genreList || []).reduce<Record<string, string>>((acc, g) => {
    acc[g.id] = g.name;
    return acc;
  }, {});

  if (favorites.length === 0) {
    return <div className="p-6">Nenhum filme na sua lista.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Minha Lista</h2>
      <div className="overflow-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="text-left p-2">Título</th>
              <th className="text-left p-2">Gênero</th>
              <th className="text-left p-2">Data de Lançamento</th>
              <th className="text-left p-2">Rating</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((m) => (
              <tr key={m.id}>
                <td className="p-2">{m.title}</td>
                <td className="p-2">{(m.genres || []).map((id) => genreMap[id] ?? id).join(', ')}</td>
                <td className="p-2">{m.releaseDate ? new Date(m.releaseDate).getFullYear() : '—'}</td>
                <td className="p-2">{m.rating.toFixed(1)}</td>
                <td className="p-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-[10px] px-2 py-1 text-xs"
                    onClick={() => removeFavorite(m.id)}
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchlistPage;
