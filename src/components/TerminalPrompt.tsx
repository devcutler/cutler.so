import { usePageContext } from 'vike-react/usePageContext';
import { TerminalCommand } from './TerminalCommand';
import { Secondary } from './Text';

interface TerminalPromptProps {
	command?: string;
	className?: string;
}

export function TerminalPrompt({
	command = '',
	className = '',
}: TerminalPromptProps) {
	const pageContext = usePageContext();
	const location = pageContext.urlPathname;

	const getTerminalPath = () => {
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
				<Secondary>$</Secondary>
			</span>
      
			{command && (
				<span style={{ color: 'var(--text-primary)' }} className="ml-2">
					<TerminalCommand>{command}</TerminalCommand>
				</span>
			)}
		</div>
	);
}