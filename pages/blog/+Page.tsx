import { useData } from 'vike-react/useData';
import { Link } from '@/components/Link';
import type { BlogEntry } from '@/types/blog';

interface PageData {
	blogPosts: BlogEntry[];
}

export default function Page() {
	const { blogPosts } = useData<PageData>();

	return (
		<div>
			<h1 className="text-4xl font-bold mb-8">Blog</h1>

			{blogPosts.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-lg mb-4">No blog posts found.</p>
					<p className="text-sm">Add some markdown files to the content directory to get started.</p>
				</div>
			) : (
				<div className="space-y-8">
					{blogPosts.map((post) => (
						<article key={post.slug} className="card p-6">
							<h2 className="text-2xl font-semibold mb-3">
								<Link href={post.path} className="hover:opacity-80 transition-opacity">
									{post.title}
								</Link>
							</h2>

							<div className="flex items-center gap-4 text-sm mb-4">
								{post.date && (
									<time dateTime={post.date.toISOString()}>
										{post.date.toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</time>
								)}

								<span>{post.length} characters</span>

								{post.tags && post.tags.length > 0 && (
									<div className="flex gap-2">
										{post.tags.map(tag => (
											<span
												key={tag}
												className="badge text-xs"
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</div>

							{post.description && (
								<p className="mb-4 leading-relaxed">
									{post.description}
								</p>
							)}

							<Link href={post.path} className="inline-flex items-center text-sm font-medium">
								Read more →
							</Link>
						</article>
					))}
				</div>
			)}
		</div>
	);
}