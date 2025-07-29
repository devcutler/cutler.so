import { Router, Route, Switch } from 'wouter';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { ContentPage } from './pages/ContentPage';
import { BlogListPage } from './pages/BlogListPage';
import { SettingsPanel } from './components/SettingsPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useContent } from './hooks/useContent';

function AppContent() {
	const { loading, error } = useContent();
	const { theme } = useTheme();

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="max-w-md mx-auto text-center p-6">
					<div
						className="text-4xl mb-4"
						style={{ color: 'var(--error-color, #ef4444)' }}
					>
						⚠️
					</div>
					<h1
						className="text-xl font-bold mb-2"
						style={{ color: 'var(--error-color, #dc2626)' }}
					>
						Failed to load content
					</h1>
					<p
						className="mb-4"
						style={{ color: 'var(--error-color, #ef4444)' }}
					>
						{error}
					</p>
					<button
						onClick={() => window.location.reload()}
						className="text-white px-4 py-2 rounded transition-colors"
						style={{
							backgroundColor: 'var(--error-color, #ef4444)',
							':hover': {
								backgroundColor:
									'var(--error-color-hover, #dc2626)',
							},
						}}
						onMouseEnter={e =>
							(e.currentTarget.style.backgroundColor =
								'var(--error-color-hover, #dc2626)')
						}
						onMouseLeave={e =>
							(e.currentTarget.style.backgroundColor =
								'var(--error-color, #ef4444)')
						}
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	const getBackgroundClasses = () => {
		switch (theme) {
			case 'terminal':
				return 'min-h-screen';
			case 'neumorphic':
				return 'min-h-screen';
			default:
				return 'min-h-screen';
		}
	};

	return (
		<Router>
			<div className={getBackgroundClasses()}>
				<ErrorBoundary>
					<Header />
				</ErrorBoundary>
				<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<Switch>
						<Route path="/blog/:slug+">
							<ErrorBoundary>
								<ContentPage />
							</ErrorBoundary>
						</Route>
						<Route path="/blog">
							<ErrorBoundary>
								<BlogListPage />
							</ErrorBoundary>
						</Route>
						<Route path="*">
							<ErrorBoundary>
								<ContentPage />
							</ErrorBoundary>
						</Route>
					</Switch>
				</main>
				<ErrorBoundary>
					<SettingsPanel />
				</ErrorBoundary>
			</div>
		</Router>
	);
}

function App() {
	return (
		<ErrorBoundary>
			<ThemeProvider>
				<AppContent />
			</ThemeProvider>
		</ErrorBoundary>
	);
}

export default App;
