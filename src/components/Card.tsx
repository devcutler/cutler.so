import { useTheme } from '@/contexts/useTheme';
import type { ReactElement, ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	className?: string;
}

export function Card({ children, className = '' }: CardProps): ReactElement {
	const { theme } = useTheme();
  
	return (
		<article className={`card ${theme} ${className}`}>
			{children}
		</article>
	);
}