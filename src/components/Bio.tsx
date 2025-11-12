import { TextVariants } from '@/components/Text';
import type { ReactElement } from 'react';

export function Bio(): ReactElement {
	return (
		<div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
			<div className="flex items-start gap-4">
				<div className="flex-1">
					<TextVariants.Heading className="mb-2">About the Author</TextVariants.Heading>
					<TextVariants.Text className="mb-3">
						Hi, I'm Richard Cutler. I build software and write about what I learn along the way.
						Currently working on various projects including a match-3 roguelike game and this website.
					</TextVariants.Text>
					<TextVariants.Text>
						You can find me on{' '}
						<a
							href="https://github.com/devcutler"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:opacity-80"
							style={{ color: 'var(--link-color)' }}
						>
							GitHub
						</a>
						{' '}or reach out via the{' '}
						<a
							href="/contact"
							className="hover:opacity-80"
							style={{ color: 'var(--link-color)' }}
						>
							contact page
						</a>
						.
					</TextVariants.Text>
				</div>
			</div>
		</div>
	);
}
