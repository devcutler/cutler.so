import type { ReactElement, ReactNode } from 'react';

interface TerminalOutputProps {
	children: ReactNode;
	className?: string;
}

export function TerminalOutput({ children, className = '' }: TerminalOutputProps): ReactElement {
	return (
		<div 
			className={`whitespace-pre-wrap font-mono text-sm ${className}`}
		>
			{children}
		</div>
	);
}