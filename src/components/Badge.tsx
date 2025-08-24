import React from 'react';

interface BadgeProps {
  variant?: 'large' | 'small';
  href?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'small', href, children }) => {
  const sizeClasses = variant === 'large' 
    ? 'h-10 px-3 text-sm' 
    : 'h-8 px-2 text-xs';

  const className = `inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all border border-input bg-background hover:bg-accent gap-2 select-none ${sizeClasses}`;

  if (href) {
    return (
      <div className={className}>
        <a href={href} className="contents">
          {children}
        </a>
      </div>
    );
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
};