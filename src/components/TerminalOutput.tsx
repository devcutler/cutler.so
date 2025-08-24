import { ReactNode } from 'react';

interface TerminalOutputProps {
  children: ReactNode;
  className?: string;
}

export function TerminalOutput({ children, className = '' }: TerminalOutputProps) {
  return (
    <div 
      className={`mt-1 whitespace-pre-wrap font-mono text-sm ${className}`}
    >
      {children}
    </div>
  );
}