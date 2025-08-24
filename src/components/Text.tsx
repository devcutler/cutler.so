import { cn } from 'clsx-for-tailwind';
import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  className?: string;
}


export function Primary({ children, className = '' }: TextProps) {
  return (
    <span className={className} style={{ color: 'var(--text-primary)' }}>
      {children}
    </span>
  );
}

export function Secondary({ children, className = '' }: TextProps) {
  return (
    <span className={className} style={{ color: 'var(--text-secondary)' }}>
      {children}
    </span>
  );
}

export function Muted({ children, className = '' }: TextProps) {
  return (
    <span className={className} style={{ color: 'var(--text-muted)' }}>
      {children}
    </span>
  );
}

export function Accent({ children, className = '' }: TextProps) {
  return (
    <span className={className} style={{ color: 'var(--accent-color)' }}>
      {children}
    </span>
  );
}

export function Error({ children, className = '' }: TextProps) {
  return (
    <span className={className} style={{ color: 'var(--error-color)' }}>
      {children}
    </span>
  );
}

export function Success({ children, className = '' }: TextProps) {
  return (
    <span className={className} style={{ color: 'var(--success-color, #22c55e)' }}>
      {children}
    </span>
  );
}

export function Title({ children, className = '' }: TextProps) {
  return (
    <h1 className={cn('text-4xl font-bold mb-4', className)}>{children}</h1>
  );
}

export function Heading({ children, className = '' }: TextProps) {
  return (
    <h2 className={cn('text-2xl font-semibold mb-6', className)}>{children}</h2>
  );
}

export function Subheading({ children, className = '' }: TextProps) {
  return (
    <h3 className={cn('text-xl font-semibold mb-4', className)}>{children}</h3>
  );
}

export function Text({ children, className = '' }: TextProps) {
  return (
    <p className={cn('text-muted-foreground text-md', className)}>{children}</p>
  );
}

export const TextVariants = {
  Primary,
  Secondary,
  Muted,
  Accent,
  Error,
  Success
};