import React from 'react';

interface IconProps {
	icon: React.ComponentType<any>;
	className?: string;
	size?: number;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, className = '', size }) => {
	const iconClassName = `text-muted-foreground inline -mt-0.5 ${className}`;
  
	return <IconComponent className={iconClassName} size={size} />;
};