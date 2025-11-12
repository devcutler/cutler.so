import { useData } from 'vike-react/useData';
import type { BlogPost } from './+data';
import '@/styles/highlight.css';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TextVariants } from '@/components/Text';
import { Bio } from '@/components/Bio';
import type { ReactElement } from 'react';

export default function Page(): ReactElement {
	const { title, description, content, date, tags } = useData<BlogPost>();

	return (
		<article className="max-w-4xl mx-auto px-4 py-8">
			<header className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
				<TextVariants.Heading className="mb-2">{title}</TextVariants.Heading>
				{description && (
					<TextVariants.Text className="mb-3">{description}</TextVariants.Text>
				)}
				<div className="flex items-center gap-3 text-sm">
					{date && (
						<TextVariants.Muted>
							{date}
						</TextVariants.Muted>
					)}
					{tags && tags.length > 0 && (
						<>
							<TextVariants.Muted>•</TextVariants.Muted>
							<div className="flex flex-wrap gap-2">
								{tags.map((tag) => (
									<TextVariants.Muted key={tag}>
										#{tag}
									</TextVariants.Muted>
								))}
							</div>
						</>
					)}
				</div>
			</header>

			<MarkdownRenderer
				className="prose prose-lg max-w-none"
				content={content}
			/>

			<Bio />
		</article>
	);
}