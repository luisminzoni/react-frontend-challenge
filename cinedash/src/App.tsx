import React from 'react';
import { QueryClientProvider } from './app/providers/QueryClientProvider';
import MovieDashboard from './features/movie-dashboard/components/MovieDashboard';
import { Login } from './features/auth/components/Login';
import { useAuthStore } from './entities/auth/store/authStore';
import WatchlistPage from './pages/watchlist/WatchlistPage';
import MovieDetailPage from './pages/movie-detail/MovieDetailPage';
import { goHome, goToWatchlist } from './shared/lib/navigation';
import { Button } from './components/ui/button';

function App() {
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const logout = useAuthStore((s) => s.logout);
  const [view, setView] = React.useState<'dashboard' | 'watchlist' | 'movie'>('dashboard');

  React.useEffect(() => {
    function handleNav(e: any) {
      const detail = e?.detail;
      if (detail?.view === 'movie' && detail?.id) {
        setView('movie');
        return;
      }
      if (detail?.view === 'watchlist') {
        setView('watchlist');
        return;
      }
      if (detail?.view === 'dashboard') {
        setView('dashboard');
        return;
      }
    }

    // on initial load, check pathname
    const path = window.location.pathname;
    if (path.startsWith('/movie/')) {
      setView('movie');
    } else if (path === '/watchlist') {
      setView('watchlist');
    }

    window.addEventListener('app:navigate', handleNav as EventListener);
    window.addEventListener('popstate', () => {
      const p = window.location.pathname;
      if (p.startsWith('/movie/')) setView('movie');
      else if (p === '/watchlist') setView('watchlist');
      else setView('dashboard');
    });
    return () => window.removeEventListener('app:navigate', handleNav as EventListener);
  }, []);

  return (
    <QueryClientProvider>
      {isAuth ? (
        <div>
          <header className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {view === 'dashboard' ? (
                <MovieDashboard.Header title="CineDash" subtitle="Dashboard de filmes" />
              ) : (
                <div />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-[10px] active:scale-95 active:bg-muted/30"
                onClick={() => { goHome(); setView('dashboard'); }}
              >
                Dashboard
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-[10px] active:scale-95 active:bg-muted/30"
                onClick={() => { goToWatchlist(); setView('watchlist'); }}
              >
                Minha Lista
              </Button>

              <Button variant="ghost" size="sm" className="rounded-[10px] active:scale-95 active:bg-muted/30" onClick={() => logout()}>
                Sair
              </Button>
            </div>
          </header>

          {view === 'dashboard' ? (
            <MovieDashboard.Root>
              <MovieDashboard.Filters />
              {/* <MovieDashboard.Stats /> //TODO: apagar  */}
              <MovieDashboard.Table />
            </MovieDashboard.Root>
          ) : window.location.pathname.startsWith('/movie/') ? (
            <MovieDetailPage />
          ) : (
            <WatchlistPage />
          )}
        </div>
      ) : (
        <Login />
      )}
    </QueryClientProvider>
  );
}

export default App;