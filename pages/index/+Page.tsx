import { useData } from 'vike-react/useData';
import { User, Rocket, FileText, Mail, Palette, Pencil, ExternalLink } from 'lucide-react';
import { Link } from '@/components/Link';
import { Content } from '@/components/Content';
import { Section } from '@/components/Section';
import { Block, BlockContent } from '@/components/Block';
import { Grid } from '@/components/Grid';
import { Icon } from '@/components/Icon';
import { TextVariants } from '@/components/Text';
import type { BlogEntry } from '@/types/blog';
import type { ReactElement } from 'react';

export default function Page(): ReactElement {
	const { latestPost, buildTime } = useData<{
		latestPost: BlogEntry | null;
		buildTime: string;
	}>();

	return (
		<Content className="max-w-6xl">
			<Section className="mb-12">
				<TextVariants.Title>Welcome to cutler.so</TextVariants.Title>
				<TextVariants.Text>
					This site is built with Vike, React, and TypeScript as a statically generated
					multi-page application. Every page is pre-rendered at build time for optimal
					performance and SEO, while still maintaining full React interactivity when needed.{' '}
					<Link href="/projects/cutler.so" className="inline-flex items-center gap-1 underline">
						Read more about it here <ExternalLink size={14} />
					</Link>
				</TextVariants.Text>
				<TextVariants.Text className="text-sm text-muted-foreground">
					Built on {new Date(buildTime).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
						hour12: true,
					})}
				</TextVariants.Text>
			</Section>

			<Section className="mb-8">
				<Grid width={2} height={2} gap={6}>
					<Link href="/about" className="block">
						<Block className="hover:shadow-lg transition-shadow h-full">
							<BlockContent>
								<TextVariants.Subheading className="mb-2">
									<Icon icon={User} /> Personal Information
								</TextVariants.Subheading>
								<TextVariants.Text className="text-muted-foreground">Learn more about me, my background, and what I do.</TextVariants.Text>
							</BlockContent>
						</Block>
					</Link>

					<Link href="/projects" className="block">
						<Block className="hover:shadow-lg transition-shadow h-full">
							<BlockContent>
								<TextVariants.Subheading className="mb-2">
									<Icon icon={Rocket} /> My Projects
								</TextVariants.Subheading>
								<TextVariants.Text className="text-muted-foreground">Explore the projects I've worked on and built.</TextVariants.Text>
							</BlockContent>
						</Block>
					</Link>

					<Link href="/contact" className="block">
						<Block className="hover:shadow-lg transition-shadow h-full">
							<BlockContent>
								<TextVariants.Subheading className="mb-2">
									<Icon icon={Mail} /> Send me a message
								</TextVariants.Subheading>
								<TextVariants.Text className="text-muted-foreground">Got a question or want to collaborate? Let's connect.</TextVariants.Text>
							</BlockContent>
						</Block>
					</Link>

					<Link href="/blog" className="block">
						<Block className="hover:shadow-lg transition-shadow h-full">
							<BlockContent>
								<TextVariants.Subheading className="mb-2">
									<Icon icon={Pencil} /> Read my blog
								</TextVariants.Subheading>
								<TextVariants.Text className="text-muted-foreground">I write about my regular experiences and explorations with tech.</TextVariants.Text>
							</BlockContent>
						</Block>
					</Link>

				</Grid>
			</Section>

			<Section className="mb-8">
				<Link href={latestPost?.path || '/blog'} className="block">
					<Block className="hover:shadow-lg transition-shadow">
						<BlockContent>
							<TextVariants.Heading>
								<Icon icon={FileText} /> Latest Post
							</TextVariants.Heading>

							{latestPost && (
								<>
									<TextVariants.Subheading>{latestPost.title}</TextVariants.Subheading>

									{latestPost.description && (
										<TextVariants.Text>{latestPost.description}</TextVariants.Text>
									)}

									<div className="flex items-center justify-between mt-4">
										{latestPost.date && (
											<time className="text-sm text-muted-foreground" dateTime={latestPost.date.toISOString()}>
												{latestPost.date.toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
													year: 'numeric',
													hour: 'numeric',
													minute: '2-digit',
													hour12: true,
												})}
											</time>
										)}

										{latestPost.tags && latestPost.tags.length > 0 && (
											<div className="flex gap-2">
												{latestPost.tags.slice(0, 3).map(tag => (
													<span key={tag} className="badge text-xs">
														{tag}
													</span>
												))}
											</div>
										)}
									</div>
								</>
							)}
						</BlockContent>
					</Block>
				</Link>
			</Section>

			<Block>
				<BlockContent>
					<TextVariants.Heading>
						<Icon icon={Palette} /> Theme System
					</TextVariants.Heading>
					<TextVariants.Text>
						This site features 5 dynamic themes that completely transform the appearance while maintaining functionality.
						Each theme provides a unique visual experience showcasing different design approaches.
					</TextVariants.Text>
					<TextVariants.Text>
						Use the settings button in the bottom-left corner to switch between Modern, Terminal, Neumorphic, NieR, and GNOME themes!
					</TextVariants.Text>
				</BlockContent>
			</Block>
		</Content>
	);
}