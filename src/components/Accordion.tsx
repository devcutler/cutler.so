import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { BlockContent } from './Block';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 p-4 font-medium transition-all duration-200 hover:bg-accent/50"
      >
        <ChevronRight className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        <span>{title}</span>
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-6 pt-0 pl-11">
            <BlockContent>
              {children}
            </BlockContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  children
}) => {
  return (
    <div className="card rounded-lg overflow-hidden">
      {children}
    </div>
  );
};

export default Accordion;