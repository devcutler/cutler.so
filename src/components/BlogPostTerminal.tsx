import { TerminalPrompt } from './TerminalPrompt';
import type { ContentIndexItem } from '../types/content';
import { formatDateShort } from '../utils/dateUtils';

interface BlogPostTerminalProps {
	posts: ContentIndexItem[];
}

export function BlogPostTerminal({ posts }: BlogPostTerminalProps) {
	return (
		<div>
			<TerminalPrompt command="ls --fancy" className="mb-4" />

			{posts.map(post => (
				<div key={post.slug} className="font-mono text-sm mb-4">
					<div>
						<span style={{ color: 'var(--text-secondary)' }}>
							-r--r--r--
						</span>
						<span
							style={{ color: 'var(--text-primary)' }}
							className="ml-2"
						>
							1 cutler cutler
						</span>
						<span
							style={{ color: 'var(--accent-color)' }}
							className="ml-4 w-12 inline-block"
						>
							{post.length.toLocaleString()}
						</span>
						<span
							style={{ color: 'var(--text-muted)' }}
							className="ml-2 w-16 inline-block"
						>
							{post.date && formatDateShort(post.date)}
						</span>
						<span
							style={{ color: 'var(--text-secondary)' }}
							className="ml-2"
						>
							<a
								href={post.slug}
								className="transition-colors underline"
								style={{ color: 'var(--text-secondary)' }}
								onMouseEnter={e =>
									(e.currentTarget.style.color =
										'var(--accent-color)')
								}
								onMouseLeave={e =>
									(e.currentTarget.style.color =
										'var(--text-secondary)')
								}
							>
								{post.title}
							</a>
						</span>
					</div>

					{post.tags && post.tags.length > 0 && (
						<div
							style={{ color: 'var(--accent-color)' }}
							className="ml-20"
						>
							[{post.tags.map(tag => `#${tag}`).join(' ')}]
						</div>
					)}

					{post.description && (
						<div
							style={{ color: 'var(--text-muted)' }}
							className="ml-20"
						>
							{post.description}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
