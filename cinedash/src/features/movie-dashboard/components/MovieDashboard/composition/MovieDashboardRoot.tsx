import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface MovieDashboardRootProps {
  children: ReactNode;
  className?: string;
}

export function MovieDashboardRoot({ 
  children, 
  className 
}: MovieDashboardRootProps) {
  return (
    <main className={cn('max-w-7xl mx-auto md:p-6 flex flex-col gap-6', className)}>
      <div className="w-full bg-background/50 rounded-lg p-4 md:p-6 shadow-sm">
        {children}
      </div>
    </main>
  );
}