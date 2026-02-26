interface MovieDashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function MovieDashboardHeader({ 
  title, 
  subtitle 
}: MovieDashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </header>
  );
}