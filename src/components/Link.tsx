import { usePageContext } from 'vike-react/usePageContext';
import type { ReactElement, ReactNode } from 'react';

interface LinkProps {
	href: string;
	children: ReactNode;
	className?: string;
}

export function Link({ href, children, className = '' }: LinkProps): ReactElement {
	const pageContext = usePageContext();
	const { urlPathname } = pageContext;
	const isActive = href === '/' ? urlPathname === href : urlPathname.startsWith(href);
  
	const baseClasses = 'text-blue-600 dark:text-blue-500 hover:underline transition-colors hover:opacity-90';
	const activeClasses = isActive ? 'font-medium' : '';
  
	return (
		<a href={href} className={`${baseClasses} ${activeClasses} ${className}`}>
			{children}
		</a>
	);
}
