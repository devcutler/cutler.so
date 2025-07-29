import { useTheme } from '../contexts/ThemeContext';
import { TerminalPrompt } from './TerminalPrompt';

export function Header() {
	const { theme } = useTheme();
  

	const getHeaderClasses = () => {
		switch (theme) {
		case 'terminal':
			return 'border-b-0';
		case 'neumorphic':
			return 'neumorph-card border-b-0';
		case 'nier':
			return 'nier-card border-b-0';
		case 'gnome':
			return 'gnome-card border-b-0';
		default:
			return 'bg-white border-b border-gray-200 shadow-sm';
		}
	};

	const getTextStyles = () => {
		return {
			username: { color: 'var(--text-muted)' },
			separator: { color: 'var(--text-muted)' },
			current: { fontWeight: theme === 'terminal' ? 'normal' : '500' },
			link: { color: 'var(--text-secondary)' },
			dollar: { color: 'var(--text-muted)' }
		};
	};

	const textStyles = getTextStyles();

	return (
		<header className={getHeaderClasses()}>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<TerminalPrompt />
          
					<nav className="flex items-center space-x-6">
						<a href="/" style={textStyles.link} className="hover:accent-color transition-colors">
              home
						</a>
						<a href="/about" style={textStyles.link} className="hover:accent-color transition-colors">
              about
						</a>
						<a href="/blog" style={textStyles.link} className="hover:accent-color transition-colors">
              blog
						</a>
					</nav>
				</div>
			</div>
		</header>
	);
}