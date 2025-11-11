import type { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface CardProps {
	children: ReactNode;
	className?: string;
}

export function Card({ children, className = '' }: CardProps) {
	const { theme } = useTheme();
  
	return (
		<article className={`card ${theme} ${className}`}>
			{children}
		</article>
	);
}