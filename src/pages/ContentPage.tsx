import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useContent } from '../hooks/useContent';
import { useMeta } from '../hooks/useMeta';
import { useTheme } from '../contexts/ThemeContext';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { formatDate } from '../utils/dateUtils';
import type { ContentItem } from '../types/content';

export function ContentPage() {
	const [location] = useLocation();
	const { getContentBySlug } = useContent();
	const { theme } = useTheme();
	const [content, setContent] = useState<ContentItem | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadContent() {
			setLoading(true);
			const loadedContent = await getContentBySlug(location);
			setContent(loadedContent);
			setLoading(false);
		}

		loadContent();
	}, [location, getContentBySlug]);

	useMeta({
		title: content
			? `${content.title} - cutler.so`
			: 'Page Not Found - cutler.so',
		description: content?.description || 'Page not found',
		ogTitle: content?.title,
		ogDescription: content?.description,
		ogUrl: `https://cutler.so${location}`,
	});

	const getContainerClasses = () => {
		switch (theme) {
			case 'terminal':
				return 'bg-transparent border-none shadow-none p-0';
			case 'neumorphic':
				return 'neumorph-card p-8';
			case 'nier':
				return 'nier-card p-8';
			case 'gnome':
				return 'gnome-card p-8';
			default:
				return 'modern-card p-8';
		}
	};

	const getContentClasses = () => {
		switch (theme) {
			case 'terminal':
				return 'leading-relaxed';
			default:
				return '';
		}
	};

	const getTextStyles = () => {
		return {
			error: { color: 'var(--error-color, #ef4444)' },
			muted: { color: 'var(--text-muted)' },
			link: { color: 'var(--accent-color)' },
			date: { color: 'var(--text-secondary)' },
			tag: {
				color: 'var(--accent-color)',
				backgroundColor: 'var(--bg-tertiary)',
			},
		};
	};

	const getTextClasses = () => {
		switch (theme) {
			case 'terminal':
				return {
					error: 'font-mono',
					muted: 'font-mono',
					link: 'hover:opacity-80 transition-colors font-mono',
					date: 'font-mono text-sm',
					tag: 'text-sm font-mono mr-4',
				};
			case 'neumorphic':
				return {
					error: '',
					muted: '',
					link: 'hover:opacity-80 transition-colors',
					date: '',
					tag: 'px-3 py-1 neumorph-inset rounded-full text-sm',
				};
			default:
				return {
					error: '',
					muted: '',
					link: 'hover:opacity-80 transition-colors',
					date: '',
					tag: 'px-3 py-1 rounded-full text-sm',
				};
		}
	};

	const textClasses = getTextClasses();
	const textStyles = getTextStyles();

	if (loading) {
		return <LoadingSpinner message="Loading content..." />;
	}

	if (!content) {
		return (
			<div
				className={`${getContainerClasses()} ${theme === 'terminal' ? 'py-0' : 'text-center py-12'}`}
			>
				<div className={getContentClasses()}>
					{theme === 'terminal' ? (
						<>
							<div
								className="font-mono text-xl mb-4"
								style={textStyles.error}
							>
								404 - File not found
							</div>
							<div
								className="font-mono mb-4"
								style={textStyles.muted}
							>
								The requested page does not exist.
							</div>
							<a
								href="/"
								className="font-mono text-sm underline hover:opacity-80 transition-colors"
								style={textStyles.link}
							>
								Return to home
							</a>
						</>
					) : (
						<>
							<h1
								className={`text-4xl font-bold mb-4 ${textClasses.error}`}
								style={textStyles.error}
							>
								404
							</h1>
							<p
								className={`${textClasses.muted} mb-8`}
								style={textStyles.muted}
							>
								Page not found
							</p>
							<a
								href="/"
								className={textClasses.link}
								style={textStyles.link}
							>
								Go home
							</a>
						</>
					)}
				</div>
			</div>
		);
	}

	return (
		<article className={getContainerClasses()}>
			<div className={getContentClasses()}>
				{theme === 'terminal' ? (
					<>
						{content.date && (
							<div
								className={`${textClasses.date} mb-2`}
								style={textStyles.date}
							>
								# Created: {formatDate(content.date)}
							</div>
						)}

						<div className="mb-4">
							<MarkdownRenderer content={content.content} />
						</div>

						{content.tags && content.tags.length > 0 && (
							<div className="mb-4">
								<div
									className="font-mono text-sm"
									style={textStyles.muted}
								>
									# Tags:
								</div>
								<div className="flex flex-wrap">
									{content.tags.map(tag => (
										<span
											key={tag}
											className={textClasses.tag}
											style={textStyles.tag}
										>
											#{tag}
										</span>
									))}
								</div>
							</div>
						)}
					</>
				) : (
					<>
						{content.date && (
							<div
								className={`text-sm ${textClasses.date} mb-4`}
								style={textStyles.date}
							>
								{formatDate(content.date)}
							</div>
						)}

						<MarkdownRenderer content={content.content} />

						{content.tags && content.tags.length > 0 && (
							<div
								className="mt-8 pt-8 border-t"
								style={{ borderColor: 'var(--border-color)' }}
							>
								<div className="flex flex-wrap gap-2">
									{content.tags.map(tag => (
										<span
											key={tag}
											className={textClasses.tag}
											style={textStyles.tag}
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</article>
	);
}
