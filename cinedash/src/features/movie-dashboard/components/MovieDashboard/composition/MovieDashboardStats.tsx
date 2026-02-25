interface MovieDashboardStatsProps {
	className?: string;
}

export function MovieDashboardStats({ className }: MovieDashboardStatsProps) {
	return (
		<div className={className}>
			{/* Minimal stats stub. Replace with real stats (cards/metrics). */}
			<div className="grid grid-cols-2 gap-4">
				<div className="p-4 border rounded">
					<div className="text-sm text-muted-foreground">Total</div>
					<div className="text-xl font-semibold">0</div>
				</div>
				<div className="p-4 border rounded">
					<div className="text-sm text-muted-foreground">Média</div>
					<div className="text-xl font-semibold">0.0</div>
				</div>
			</div>
		</div>
	);
}

export default MovieDashboardStats;
