interface TerminalCommandProps {
	children: string;
	className?: string;
}

export function TerminalCommand({ children, className = '' }: TerminalCommandProps) {
	const tokens = children.split(' ');
  
	return (
		<span className={`font-mono ${className}`}>
			{tokens.map((token, index) => {
				let style: React.CSSProperties = {};
        
				if (index === 0) {
					style.color = 'var(--text-primary)';
				} else if (token.startsWith('-')) {
					style.color = 'var(--text-secondary)';
				} else {
					style.color = 'var(--text-muted)';
				}
        
				return (
					<span key={index} style={style}>
						{token}
						{index < tokens.length - 1 && ' '}
					</span>
				);
			})}
		</span>
	);
}