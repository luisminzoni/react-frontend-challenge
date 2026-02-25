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
    <div className={cn('flex flex-col gap-6 p-6', className)}>
      {children}
    </div>
  );
}