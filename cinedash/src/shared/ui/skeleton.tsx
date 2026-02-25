import React from 'react';

interface SkeletonProps {
	className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
	return <div className={["bg-muted animate-pulse rounded", className].filter(Boolean).join(' ')} />;
}

export default Skeleton;
