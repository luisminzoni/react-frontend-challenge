interface MovieDashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function MovieDashboardHeader({ 
  title, 
  subtitle 
}: MovieDashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground">{subtitle}</p>
      )}
    </header>
  );
}