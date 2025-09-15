import React from 'react';

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Content: React.FC<ContentProps> = ({ children, className = '' }) => {
  return (
    <main className={`container mx-auto px-4 py-12 max-w-4xl space-y-8 ${className}`}>
      {children}
    </main>
  );
};