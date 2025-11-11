import { useData } from 'vike-react/useData';
import type { BlogPost } from './+data';
import '@/styles/highlight.css';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export default function Page() {
	const { title, content, date, tags } = useData<BlogPost>();

	return (
		<article className="max-w-4xl mx-auto px-4 py-8">
			<header className="mb-8">
				<h1 className="text-4xl font-bold mb-4">{title}</h1>
				{date && (
					<time className="text-gray-600 text-sm">
						{new Date(date).toLocaleDateString()}
					</time>
				)}
			</header>

			<MarkdownRenderer
				className="prose prose-lg max-w-none"
				content={content}
			/>

			{tags && tags.length > 0 && (
				<footer className="mt-8 pt-8 border-t border-gray-200">
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
							>
								{tag}
							</span>
						))}
					</div>
				</footer>
			)}
		</article>
	);
}