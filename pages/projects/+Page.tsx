import { ProjectCard } from './components/ProjectCard';
import { Content } from '@/components/Content';
import { Section } from '@/components/Section';
import { Grid } from '@/components/Grid';
import { TextVariants } from '@/components/Text';
import type { ReactElement } from 'react';

export default function Page(): ReactElement {
	return (
		<Content>
			<Section>
				<header>
					<TextVariants.Title>My Projects</TextVariants.Title>
					<TextVariants.Text>
						A collection of projects I've worked on, from personal experiments to production applications.
					</TextVariants.Text>
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

					<ProjectCard
						project={{
							name: 'Match-3 Roguelike',
							description: 'A match-3 roguelike inspired by Puzzle Quest, built in C# with Raylib. Features turn-based combat, procedural encounters, and equipment progression.',
							technologies: [ 'C#', '.NET 8', 'Raylib', 'Game Development' ],
							link: '/projects/match3',
							type: 'Personal',
						}}
					/>
				</Grid>
			</Section>
		</Content>
	);
}