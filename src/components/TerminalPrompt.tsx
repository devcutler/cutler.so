import { usePageContext } from 'vike-react/usePageContext';
import { TerminalCommand } from './TerminalCommand';
import { TextVariants } from './Text';
import type { ReactElement } from 'react';

interface TerminalPromptProps {
	command?: string;
	className?: string;
}

export function TerminalPrompt({
	command = '',
	className = '',
}: TerminalPromptProps): ReactElement {
	const pageContext = usePageContext();
	const location = pageContext.urlPathname;

	const getTerminalPath = (): string => {
		if (location === '/') return '~';
		return `~${location}`;
	};

	return (
		<div className={`font-mono text-sm ${className}`}>
			<span style={{ color: 'var(--text-primary)' }}>cutler@cutler.so</span>
			<span style={{ color: 'var(--text-primary)' }} className="mx-1">
				:
			</span>
			<span style={{ color: 'var(--accent-color)' }}>
				{getTerminalPath()}
			</span>
			<span className="ml-2">
				<TextVariants.Secondary>$</TextVariants.Secondary>
			</span>
      
			{command && (
				<span style={{ color: 'var(--text-primary)' }} className="ml-2">
					<TerminalCommand>{command}</TerminalCommand>
				</span>
			)}
		</div>
	);
}