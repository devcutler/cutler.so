
interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<div 
					className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
					style={{ borderColor: 'var(--accent-color)' }}
				/>
				<p 
					className="font-mono text-sm"
					style={{ color: 'var(--text-secondary)' }}
				>
					{message}
				</p>
			</div>
		</div>
	);
}