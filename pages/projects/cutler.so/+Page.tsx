import { Content } from '@/components/Content';
import { Section } from '@/components/Section';
import { Block, BlockContent } from '@/components/Block';
import { Title, Text, Heading, Subheading } from '@/components/Text';
import { Badge } from '@/components/Badge';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Github, Globe, ArrowLeft } from 'lucide-react';

export default function Page() {

	return (
		<Content>
			<Section>
				<div className="mb-6">
					<a
						href="/projects"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
					>
						<ArrowLeft size={16} />
						Back to Projects
					</a>
				</div>

				<header className="mb-8">
					<Title>cutler.so</Title>
					<div className="flex items-center gap-4 mt-4">
						<span className="text-sm font-medium text-blue-600">
							Personal
						</span>
						<a
							href="https://github.com/devcutler/cutler.so"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
						>
							<Github size={16} />
							GitHub
						</a>
						<a
							href="https://cutler.so"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
						>
							<Globe size={16} />
							Live Site
						</a>
					</div>
				</header>

				{/* Overview */}
				<Block>
					<BlockContent>
						<Heading>Overview</Heading>
						<Text>
							This personal website built with Vike, React, and TypeScript. Features SSG, multiple themes, and a markdown-based blog.
						</Text>

						<Subheading>Technologies</Subheading>
						<div className="flex flex-wrap gap-2">
							<Badge variant="small">React</Badge>
							<Badge variant="small">TypeScript</Badge>
							<Badge variant="small">Vike</Badge>
							<Badge variant="small">Tailwind CSS</Badge>
						</div>
					</BlockContent>
				</Block>
			</Section>

			<Section>
				<Heading>About This Project</Heading>
        
				<Text>
					This site uses Vike as the meta-framework, which provides file-based routing and static site generation
					on top of Vite. Each page is pre-rendered at build time through Vike's SSG, generating static
					HTML files while preserving React's client-side interactivity for dynamic components. It specifically
					only bundles necessary code, to keep bundle sizes down.
				</Text>

				<Text>
					The configuration leverages Vike's +onBeforePrerenderStart hooks to collect page routes and data at
					build time. For the blog system, markdown files in the /content directory are processed during the
					build step, with frontmatter parsed using gray-matter and content rendered through a remark/rehype
					pipeline that includes GitHub Flavored Markdown and syntax highlighting.
				</Text>

				<Text>
					The SSG setup is configured in the root +config.ts file which enables prerendering for all pages:
				</Text>

				<MarkdownRenderer content={`\`\`\`typescript
export default {
  prerender: true,
  hydrationCanBeSkipped: true
} satisfies Config;
\`\`\``} />

				<Text>
					Individual pages define their data requirements through +data.ts files that run at build time.
					The blog pages use +onBeforePrerenderStart to generate routes dynamically from the markdown files:
				</Text>

				<MarkdownRenderer content={`\`\`\`typescript
export async function onBeforePrerenderStart(): Promise<string[]> {
  const contentDir = path.join(process.cwd(), 'content');
  const files = await fs.readdir(contentDir);

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => \`/blog/\${file.replace('.md', '')}\`);
}
\`\`\``} />

				<Text>
					Data fetching in Vike follows a pattern where +data.ts files export functions that run at build time
					(for SSG) or request time (for SSR). Components then access this data through the useData() hook:
				</Text>

				<MarkdownRenderer content={`\`\`\`typescript
// +data.ts - runs at build time
export async function data(): Promise<PageData> {
  const latestPost = await getLatestBlogPost();
  return {
    latestPost,
    buildTime: new Date().toISOString()
  };
}

// +Page.tsx - component receives the data
import { useData } from 'vike-react/useData';

export default function Page() {
  const { latestPost, buildTime } = useData<PageData>();

  return (
    <div>
      <h1>Latest: {latestPost?.title}</h1>
      <p>Built: {new Date(buildTime).toLocaleDateString()}</p>
    </div>
  );
}
\`\`\``} />

				<Text>
					The theming system uses CSS custom properties and a React context provider that persists theme
					selection to localStorage. Theme files are loaded dynamically and CSS variables are updated to
					switch between the different visual styles without requiring page reloads.
				</Text>
			</Section>

		</Content>
	);
}