import React from 'react';
import { Text } from './Text';

interface ListItemProps {
  children: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <>{children}</>;
};

interface ListProps {
  children: React.ReactNode;
  bullet?: React.ComponentType;
  className?: string;
}

export const List: React.FC<ListProps> = ({ children, bullet: Bullet, className = '' }) => {
  const items = React.Children.toArray(children);
  
  return (
    <ul className={`space-y-2 text-muted-foreground ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          {Bullet ? <Bullet /> : <span>•</span>}
          <Text>{item}</Text>
        </li>
      ))}
    </ul>
  );
};