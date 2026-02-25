import { createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClientProvider } from '@/app/providers/QueryClientProvider';

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider>
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    </QueryClientProvider>
  ),
});