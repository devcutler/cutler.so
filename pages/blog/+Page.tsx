import { useData } from 'vike-react/useData';
import { Link } from '@/components/Link';
import { TextVariants } from '@/components/Text';
import type { BlogEntry } from '@/types/blog';
import type { ReactElement } from 'react';

interface PageData {
	blogPosts: BlogEntry[];
}

export default function Page(): ReactElement {
	const { blogPosts } = useData<PageData>();

	return (
		<div>
			<TextVariants.Title>Blog</TextVariants.Title>

			{blogPosts.length === 0 ? (
				<div className="text-center py-12">
					<TextVariants.Text className="mb-4">No blog posts found.</TextVariants.Text>
					<TextVariants.Muted>Add some markdown files to the content directory to get started.</TextVariants.Muted>
				</div>
			) : (
				<div className="space-y-8">
					{blogPosts.map((post) => (
						<article key={post.slug} className="card p-6">
							<TextVariants.Heading className="mb-3">
								<Link href={post.path} className="hover:opacity-80 transition-opacity">
									{post.title}
								</Link>
							</TextVariants.Heading>

							<div className="flex items-center gap-4 text-sm mb-4">
								{post.date && (
									<TextVariants.Muted>
										{post.date}
									</TextVariants.Muted>
								)}

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
								<TextVariants.Text className="mb-4">
									{post.description}
								</TextVariants.Text>
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