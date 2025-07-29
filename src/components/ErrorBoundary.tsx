import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--error-bg, #fef2f2)' }}>
					<div className="max-w-md mx-auto text-center p-6">
						<div className="text-6xl mb-4" style={{ color: 'var(--error-color, #dc2626)' }}>⚠️</div>
						<h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--error-color-dark, #991b1b)' }}>Something went wrong</h1>
						<p className="mb-4" style={{ color: 'var(--error-color, #dc2626)' }}>
              The application encountered an unexpected error.
						</p>
						<details className="text-left p-4 rounded mb-4" style={{ backgroundColor: 'var(--error-bg-light, #fee2e2)' }}>
							<summary className="cursor-pointer font-medium" style={{ color: 'var(--error-color-dark, #991b1b)' }}>
                Error Details
							</summary>
							<pre className="mt-2 text-sm overflow-auto" style={{ color: 'var(--error-color-muted, #b91c1c)' }}>
								{this.state.error?.stack || this.state.error?.message}
							</pre>
						</details>
						<button
							onClick={() => window.location.reload()}
							className="text-white px-4 py-2 rounded transition-colors"
							style={{ backgroundColor: 'var(--error-color, #dc2626)' }}
							onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--error-color-hover, #b91c1c)'}
							onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--error-color, #dc2626)'}
						>
              Reload Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}