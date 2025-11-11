import { ProjectCard } from './components/ProjectCard';
import { Content } from '@/components/Content';
import { Section } from '@/components/Section';
import { Block, BlockContent } from '@/components/Block';
import { Grid } from '@/components/Grid';
import { Title, Text } from '@/components/Text';

export default function Page() {
	return (
		<Content>
			<Section>
				<header>
					<Title>My Projects</Title>
					<Text>
						A collection of projects I've worked on, from personal experiments to production applications.
					</Text>
				</header>
        
				<Grid width={2}>
					<ProjectCard
						project={{
							name: 'cutler.so',
							description: 'This personal website built with Vike, React, and TypeScript. Features SSG, multiple themes, and a markdown-based blog.',
							technologies: [ 'React', 'TypeScript', 'Vike', 'Tailwind CSS' ],
							link: '/projects/cutler.so',
							type: 'Personal',
						}}
					/>
          
					<Block className="h-full flex flex-col items-center justify-center text-center">
						<BlockContent>
							<Text>More projects coming soon!</Text>
							<Text>Stay tuned for updates</Text>
						</BlockContent>
					</Block>
				</Grid>
			</Section>
		</Content>
	);
}