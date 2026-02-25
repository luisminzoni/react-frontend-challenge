import React, { ReactNode } from 'react';

interface CardProps {
	children?: ReactNode;
	className?: string;
}

export function Card({ children, className }: CardProps) {
	return <div className={['bg-card p-4 rounded', className].filter(Boolean).join(' ')}>{children}</div>;
}

export function CardHeader({ children, className }: CardProps) {
	return <div className={['mb-2', className].filter(Boolean).join(' ')}>{children}</div>;
}

export function CardContent({ children, className }: CardProps) {
	return <div className={className}>{children}</div>;
}

export default Card;
