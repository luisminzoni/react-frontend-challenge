interface SkeletonProps {
	className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
	return <div className={["skeleton-shimmer bg-muted rounded", className].filter(Boolean).join(' ')} />;
}

export default Skeleton;
