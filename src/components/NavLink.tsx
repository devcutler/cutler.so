import { usePageContext } from 'vike-react/usePageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from 'clsx-for-tailwind';
import type { ReactNode } from 'react';

interface NavLinkProps {
	href: string;
	children: ReactNode;
	className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
	const pageContext = usePageContext();
	const { urlPathname } = pageContext;

	const isActive = href === '/'
		? urlPathname === href
		: href === '/blog'
			? urlPathname.startsWith('/blog')
			: urlPathname.startsWith(href);

	const classes = cn(
		'transition-colors text-sm hover:opacity-80',

		{
			'font-medium': isActive,
		},

		className,
	);

	const colorStyle = {
		color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
	};

	return (
		<a
			href={href}
			className={classes}
			style={colorStyle}
		>
			{children}
		</a>
	);
}