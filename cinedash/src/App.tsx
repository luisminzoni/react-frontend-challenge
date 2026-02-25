import { QueryClientProvider } from './app/providers/QueryClientProvider';
import MovieDashboard from './features/movie-dashboard/components/MovieDashboard';
import { Login } from './features/auth/components/Login';
import { useAuthStore } from './entities/auth/store/authStore';

function App() {
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const logout = useAuthStore((s) => s.logout);

  return (
    <QueryClientProvider>
      {isAuth ? (
        <div>
          <header className="p-4 flex justify-end">
            <button onClick={() => logout()} className="px-3 py-1 border rounded">
              Sair
            </button>
          </header>
          <MovieDashboard.Root>
            <MovieDashboard.Header title="CineDash" subtitle="Dashboard de filmes" />
            <MovieDashboard.Filters />
            <MovieDashboard.Stats />
            <MovieDashboard.Table />
          </MovieDashboard.Root>
        </div>
      ) : (
        <Login />
      )}
    </QueryClientProvider>
  );
}

export default App;