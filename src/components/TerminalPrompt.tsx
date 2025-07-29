import { useLocation } from 'wouter';

interface TerminalPromptProps {
	command?: string;
	className?: string;
}

export function TerminalPrompt({
	command = '',
	className = '',
}: TerminalPromptProps) {
	const [location] = useLocation();

	const getTerminalPath = () => {
		if (location === '/') return '~';
		return `~${location}`;
	};

	return (
		<div className={`font-mono text-sm ${className}`}>
			<span style={{ color: 'var(--text-muted)' }}>cutler@cutler.so</span>
			<span style={{ color: 'var(--text-muted)' }} className="mx-1">
				:
			</span>
			<span style={{ color: 'var(--accent-color)' }}>
				{getTerminalPath()}
			</span>
			<span style={{ color: 'var(--text-muted)' }} className="ml-2">
				$
			</span>
			{command && (
				<span style={{ color: 'var(--text-primary)' }} className="ml-2">
					{command}
				</span>
			)}
		</div>
	);
}
