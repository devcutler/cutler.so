import type { ReactElement, ReactNode } from 'react';

interface TerminalLogProps {
	children: ReactNode;
	className?: string;
}

export function TerminalLog({ children, className = '' }: TerminalLogProps): ReactElement {
	return (
		<div className={`bg-surface border rounded-lg p-4 ${className}`}>
			{children}
		</div>
	);
}