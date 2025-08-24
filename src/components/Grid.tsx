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
    ? gap === 1 ? 'gap-1' :
      gap === 2 ? 'gap-2' :
      gap === 3 ? 'gap-3' :
      gap === 4 ? 'gap-4' :
      gap === 5 ? 'gap-5' :
      gap === 6 ? 'gap-6' :
      gap === 8 ? 'gap-8' :
      gap === 12 ? 'gap-12' : `gap-${gap}`
    : gap;

  return (
    <div className={`grid ${widthClass} ${heightClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};