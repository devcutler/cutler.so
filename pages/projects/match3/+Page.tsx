import { Content } from '@/components/Content';
import { Section } from '@/components/Section';
import { Block, BlockContent } from '@/components/Block';
import { TextVariants } from '@/components/Text';
import { Badge } from '@/components/Badge';
import { Github, ArrowLeft } from 'lucide-react';
import type { ReactElement } from 'react';

export default function Page(): ReactElement {
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
					<TextVariants.Title>Match-3 Roguelike</TextVariants.Title>
					<div className="flex items-center gap-4 mt-4">
						<span className="text-sm font-medium text-blue-600">
							Personal
						</span>
						<a
							href="https://github.com/devcutler/match3"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
						>
							<Github size={16} />
							GitHub
						</a>
					</div>
				</header>

				<Block>
					<BlockContent>
						<TextVariants.Heading>Overview</TextVariants.Heading>
						<TextVariants.Text>
							A match-3 roguelike game that explores async-first architecture in game development. Built in C#
							using Raylib, this project tackles complex state management, event-driven design, and real-time
							visual feedback challenges inherent in turn-based puzzle combat systems.
						</TextVariants.Text>

						<TextVariants.Subheading>Technologies</TextVariants.Subheading>
						<div className="flex flex-wrap gap-2">
							<Badge variant="small">C#</Badge>
							<Badge variant="small">.NET 8</Badge>
							<Badge variant="small">Raylib</Badge>
							<Badge variant="small">Async Patterns</Badge>
							<Badge variant="small">Event-Driven Architecture</Badge>
						</div>
					</BlockContent>
				</Block>
			</Section>

			<Section>
				<TextVariants.Heading>What I Built & Why</TextVariants.Heading>

				<TextVariants.Text>
					I wanted to build a match-3 game with real combat mechanics, but I quickly realized traditional
					game loop patterns wouldn't work. Here's what I learned building it. For a deeper dive into the
					architectural decisions, check out my{' '}
					<a href="/blog/async-game-loops" style={{ color: 'var(--link-color)' }}>
						blog post on async game loops
					</a>.
				</TextVariants.Text>

				<Block>
					<BlockContent>
						<TextVariants.Subheading>Event System for Equipment Effects</TextVariants.Subheading>
						<TextVariants.Text>
							I wanted equipment and artifacts that could modify game behavior- a sword that increases damage,
							armor that grants bonus shields, etc. The naive approach would be checking every equipped item
							in every damage calculation, every effect running, each custom event, and so on. I knew from the
							start that would be a pretty bad idea, so I looked for some other options.
						</TextVariants.Text>
						<TextVariants.Text>
							I initially looked into an ECS-style system, which is almost like an events system in this case, but with an extra
							layer of things going on that made it slightly unwieldy for my purposes. It is a good way to get various
							unrelated types of things to interact together well, but the way things were organised was too heavy for my
							limited use given that it was essentially just a few specified types of things I'd know ahead of time, instead of
							many unrelated things that I would be developing later, I decided ECS wasn't the right structure for this.
						</TextVariants.Text>
						<TextVariants.Text>
							Instead, I built a simple bespoke event system. When something happens (match found, damage dealt,
							turn starts), the game fires an event. Equipment subscribes to relevant events with simple checks and modifies the
							result. Events run sequentially and can be cancelled, which gives artifacts fine-grained control without tightly
							coupling them to core game logic. An artifact can modify match effects without the match detection code knowing artifacts exist.
						</TextVariants.Text>
					</BlockContent>
				</Block>

				<Block>
					<BlockContent>
						<TextVariants.Subheading>Gravity and Cascades</TextVariants.Subheading>
						<TextVariants.Text>
							When you clear matched cells, the remaining cells need to fall and fill the gaps. Seems simple
							until you add irregular board shapes (star patterns, diamonds, etc.). Cells can't just fall
							straight down if there's a gap in the layout. I had a lot of trouble with this initially before
							reworking the gravity and backfilling systems.
						</TextVariants.Text>
						<TextVariants.Text>
							My solution: for each column, find the lowest available position for each cell, accounting for
							layout gaps. After gravity, spawn new cells at the top and check for new matches. Repeat until
							no new matches exist. Each iteration animates the falls with physics-based easing so players
							can visually track the chain. I cap cascades at 50 iterations to prevent infinite loops, though
							I've never seen one get past 10 in practice.
						</TextVariants.Text>
					</BlockContent>
				</Block>

				<Block>
					<BlockContent>
						<TextVariants.Subheading>AI That Doesn't Lag the Game</TextVariants.Subheading>
						<TextVariants.Text>
							Enemy AI needs to pick good moves, but evaluating every possible swap is expensive. An 8×8 board
							has hundreds of potential swaps to check, and each needs match detection plus cascade simulation
							to properly evaluate.
						</TextVariants.Text>
						<TextVariants.Text>
							There were some easy gimmes. Not easy in implementation, but easy logically. Firstly, the AI will
							never make an "invalid" move (a move that results in zero matches). That means I can run cheap filtering
							on the board first, before comparing the board and doing any expensive swap trees.
						</TextVariants.Text>
						<TextVariants.Text>
							Then, I implemented tiered AI: weak enemies only check adjacent swaps for immediate matches, medium
							enemies simulate one cascade level, strong enemies consider player blocking. I added a pre-filter
							that checks if a swap could possibly create matches before doing expensive validation- if swapping
							two cells won't put either cell adjacent to matching types, skip it.
						</TextVariants.Text>
						<TextVariants.Text>
							At some point, I may use proper multithreading to process different branches in parallel, but I don't
							think this is really necessary yet. Maybe if I choose to make a much harder difficulty that can look
							ahead more aggressively, it could be useful.
						</TextVariants.Text>
					</BlockContent>
				</Block>

				<Block>
					<BlockContent>
						<TextVariants.Subheading>Animation System Design</TextVariants.Subheading>
						<TextVariants.Text>
							I needed cells to smoothly animate while maintaining clean async code. I tried a few approaches
							before deciding on a simple pattern: animations are objects with an Update method and an IsComplete
							flag. The AnimationManager tracks active animations and ticks them each frame.
						</TextVariants.Text>
						<TextVariants.Text>
							Each animation holds a TaskCompletionSource that completes when the animation finishes. Game
							code awaits that Task, which pauses turn processing until animations finish. The GroupAnimation
							class lets multiple cells animate simultaneously while waiting for all of them to complete. This
							keeps turn logic sequential (await swap, await gravity, await new cells) while letting visual
							effects run in parallel.
						</TextVariants.Text>
					</BlockContent>
				</Block>
			</Section>

		</Content>
	);
}
