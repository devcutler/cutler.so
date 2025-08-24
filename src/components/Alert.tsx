import React from 'react';

interface AlertProps {
  variant?: 'note' | 'tip' | 'warning' | 'error';
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
  variant = 'note', 
  title, 
  icon, 
  children, 
  className = '' 
}) => {
  const variantClass = `markdown-alert alert-${variant}`;
  
  return (
    <aside className={`${variantClass} ${className}`}>
      {(title || icon) && (
        <header className="markdown-alert-title">
          {icon && <span className="alert-icon text-base mr-[-3px]">{icon}</span>}
          {title}
        </header>
      )}
      {children}
    </aside>
  );
};