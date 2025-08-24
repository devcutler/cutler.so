import { cn } from 'clsx-for-tailwind';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '' }) => {
  return (
    <section className={cn('space-y-8', className)}>
      {children}
    </section>
  );
};