import { useEffect, useState } from 'react';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

interface MarkdownRendererProps {
	content: string;
	className?: string;
}

export function MarkdownRenderer({
	content,
	className = '',
}: MarkdownRendererProps) {
	const [html, setHtml] = useState<string>('');

	useEffect(() => {
		async function processMarkdown() {
			try {
				const result = await remark()
					.use(remarkGfm)
					.use(remarkGemoji)
					.use(remarkRehype)
					.use(rehypeStringify)
					.process(content);

				setHtml(String(result));
			} catch (error) {
				console.error('Error processing markdown:', error);
				setHtml('<p>Error rendering content</p>');
			}
		}

		processMarkdown();
	}, [content]);

	return (
		<div
			className={`prose prose-lg max-w-none ${className}`}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
