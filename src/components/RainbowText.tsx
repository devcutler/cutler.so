import type { ReactNode } from 'react';

interface RainbowTextProps {
	children: ReactNode;
	className?: string;
}

export function RainbowText({ children, className = '' }: RainbowTextProps) {
	return (
		<span 
			className={`bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent animate-[hueRotate_1s_linear_infinite] ${className}`}
		>
			{children}
		</span>
	);
}