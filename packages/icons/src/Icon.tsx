import React from 'react';

interface IconProps {
	src: string;
	alt: string;
	size?: number;
	className?: string;
}

export const Icon: React.FC<IconProps> = ({ 
	src, 
	alt, 
	size = 24, 
	className, 
}) => {
	return (
		<img 
			src={src} 
			alt={alt} 
			width={size} 
			height={size} 
			className={className}
			style={{ objectFit: 'contain' }}
		/>
	);
};