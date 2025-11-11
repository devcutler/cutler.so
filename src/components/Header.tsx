import { TerminalPrompt } from './TerminalPrompt.js';
import { NavLink } from './NavLink.js';
import type { ReactElement } from 'react';

export function Header(): ReactElement {
	return (
		<header className="header">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<TerminalPrompt />

					<nav className="flex items-center space-x-6">
						<NavLink href="/">
							home
						</NavLink>
						<NavLink href="/about">
							about
						</NavLink>
						<NavLink href="/projects">
							projects
						</NavLink>
						<NavLink href="/blog">
							blog
						</NavLink>
						<NavLink href="/contact">
							contact
						</NavLink>
					</nav>
				</div>
			</div>
		</header>
	);
}