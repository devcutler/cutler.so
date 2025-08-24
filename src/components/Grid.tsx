import React from 'react';

interface GridProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  gap?: number | string;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({ 
  children, 
  width = 2, 
  height = 'auto', 
  gap = 6, 
  className = '' 
}) => {
  const widthClass = typeof width === 'number' 
    ? `grid-cols-${width} md:grid-cols-${width}` 
    : width;
  
  const heightClass = typeof height === 'number' 
    ? `grid-rows-${height}` 
    : '';
  
  const gapClass = typeof gap === 'number' 
    ? `gap-${gap}` 
    : gap;

  return (
    <div className={`grid ${widthClass} ${heightClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};