import React from 'react';

interface BlockProps {
	children: React.ReactNode;
	className?: string;
}

export const Block: React.FC<BlockProps> = ({ children, className = '' }) => {
	return (
		<section className={`card p-6 ${className}`}>
			{children}
		</section>
	);
};

interface BlockContentProps {
	children: React.ReactNode;
	gap?: number;
	className?: string;
}

export const BlockContent: React.FC<BlockContentProps> = ({ children, gap = 8, className = '' }) => {
	return (
		<div className={`space-y-${gap} ${className}`}>
			{children}
		</div>
	);
};